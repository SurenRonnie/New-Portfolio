import { streamChat } from '@/lib/ai/graph';
import { loadHistory, saveTurn } from '@/lib/ai/memory';
import { rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_QUESTION_LENGTH = 1000;

function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request) {
  const ip = clientIp(request);

  const limit = rateLimit(`chat:${ip}`, { max: 40, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return Response.json(
      { error: `Too many messages. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const question = String(body.message || '').trim();
  const sessionId = String(body.sessionId || '').slice(0, 64);

  if (!question) return Response.json({ error: 'Message is required.' }, { status: 400 });
  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json({ error: 'Message is too long (1000 characters max).' }, { status: 400 });
  }

  const history = await loadHistory(sessionId);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // The client can disconnect mid-stream (widget closed, page navigated).
      // Enqueueing after that throws "Controller is already closed", so track it.
      let closed = false;
      const send = (obj) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
        } catch {
          closed = true;
        }
      };
      try {
        for await (const event of streamChat({ question, history })) {
          send(event);
          if (event.type === 'done') {
            // Persist after responding so memory never delays the reply.
            saveTurn(sessionId, {
              question,
              answer: event.answer,
              intent: event.intent,
              sentiment: event.sentiment,
              meta: { ip, userAgent: request.headers.get('user-agent') || 'unknown' },
            }).catch(() => {});
          }
        }
      } catch (err) {
        console.error('[chat] stream error:', err);
        send({ type: 'error', error: 'Something went wrong. Please try again.' });
      } finally {
        send({ type: 'end' });
        if (!closed) {
          try { controller.close(); } catch { /* already closed by the client */ }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
