import { NextResponse } from 'next/server';
import { validateContact } from '@/lib/contactSchema';
import { getMessagesCollection } from '@/lib/mongodb';
import { sendOwnerNotification, sendAutoReply } from '@/lib/mail';
import { rateLimit } from '@/lib/rateLimit';

// Mongo + nodemailer need the Node runtime; they do not run on Edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request) {
  const ip = clientIp(request);

  // 1 ─ Loose flood guard. Cheap rejections (bad JSON, failed validation) only
  //     count here, so a visitor fixing typos is never locked out.
  const flood = rateLimit(`contact:flood:${ip}`, { max: 30 });
  if (!flood.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(flood.retryAfter) } }
    );
  }

  // 2 ─ Parse.
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  // 3 ─ Validate with the same schema the form uses.
  const { success, data, errors } = validateContact(body);
  if (!success) {
    return NextResponse.json(
      { success: false, message: 'Please correct the highlighted fields.', errors },
      { status: 400 }
    );
  }

  // 3b ─ Strict limit on submissions that actually reach the database and
  //      mailer. Only well-formed payloads are counted.
  const limit = rateLimit(`contact:send:${ip}`, { max: 5 });
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: `Too many messages sent. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const submittedAt = new Date();
  const document = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    status: 'new',
    read: false,
    meta: {
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || null,
    },
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };

  // 4 ─ Persist first. The database is the source of truth; if mail fails we
  //     still have the enquiry rather than losing it.
  let insertedId;
  try {
    const collection = await getMessagesCollection();
    const result = await collection.insertOne(document);
    insertedId = result.insertedId;
  } catch (err) {
    console.error('[contact] mongo insert failed:', err);
    return NextResponse.json(
      { success: false, message: 'Could not save your message. Please try again later.' },
      { status: 503 }
    );
  }

  // 5 ─ Send mail. A delivery failure must not fail the request, because the
  //     message is already stored — surface it as a partial success instead.
  const [ownerResult, replyResult] = await Promise.allSettled([
    sendOwnerNotification(data, { submittedAt, ip }),
    sendAutoReply(data),
  ]);

  const ownerSent = ownerResult.status === 'fulfilled';
  const replySent = replyResult.status === 'fulfilled';

  if (!ownerSent) console.error('[contact] owner notification failed:', ownerResult.reason?.message);
  if (!replySent) console.error('[contact] auto-reply failed:', replyResult.reason?.message);

  try {
    const collection = await getMessagesCollection();
    await collection.updateOne(
      { _id: insertedId },
      { $set: { 'mail.ownerNotified': ownerSent, 'mail.autoReplied': replySent, updatedAt: new Date() } }
    );
  } catch (err) {
    console.error('[contact] mail-status update failed:', err.message);
  }

  return NextResponse.json(
    {
      success: true,
      id: String(insertedId),
      emailed: ownerSent,
      message: ownerSent
        ? 'Message sent successfully! I will get back to you soon.'
        : 'Message received! Email delivery is delayed, but your enquiry is saved.',
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method not allowed. Use POST.' }, { status: 405 });
}
