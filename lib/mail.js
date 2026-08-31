import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
} = process.env;

const BRAND = '#BFFF0B';
const OWNER_NAME = 'Surendar G';

let cachedTransporter = null;

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.');
  }

  const port = Number(SMTP_PORT) || 587;

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    // Google displays app passwords as 4 space-separated groups purely for
    // readability ("abcd efgh ijkl mnop"). The real secret is the 16 characters
    // with no spaces, so strip any whitespace a copy-paste brought along.
    auth: { user: SMTP_USER.trim(), pass: SMTP_PASS.replace(/\s+/g, '') },
    pool: true,
    maxConnections: 3,
  });

  return cachedTransporter;
}

/** Escapes user input before it goes anywhere near an HTML email body. */
function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function layout(title, inner) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0a0a0a;font-family:Inter,Arial,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #222;">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND};">${esc(title)}</div>
    </td></tr>
    <tr><td style="padding:28px;">${inner}</td></tr>
    <tr><td style="padding:18px 28px;border-top:1px solid #222;color:#666;font-size:12px;">
      Sent from the portfolio contact form &middot; ${esc(OWNER_NAME)}
    </td></tr>
  </table>
</body></html>`;
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:120px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 0;color:#fff;font-size:14px;">${esc(value)}</td>
  </tr>`;
}

/** Notification to the site owner. Reply-To is the sender, so hitting reply works. */
export async function sendOwnerNotification(data, meta = {}) {
  const transporter = getTransporter();

  const html = layout('New Contact Enquiry', `
    <h1 style="margin:0 0 20px;font-size:22px;color:#fff;">${esc(data.subject)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', data.fullName)}
      ${row('Email', data.email)}
      ${row('Phone', data.phone)}
      ${meta.submittedAt ? row('Received', new Date(meta.submittedAt).toUTCString()) : ''}
      ${meta.ip ? row('IP', meta.ip) : ''}
    </table>
    <div style="margin-top:22px;padding:18px;background:#0a0a0a;border-left:3px solid ${BRAND};border-radius:8px;">
      <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
      <div style="color:#ddd;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(data.message)}</div>
    </div>
  `);

  return transporter.sendMail({
    from: MAIL_FROM || `"Portfolio Contact" <${SMTP_USER}>`,
    to: MAIL_TO || SMTP_USER,
    replyTo: `"${data.fullName}" <${data.email}>`,
    subject: `New enquiry: ${data.subject}`,
    html,
    text:
      `New contact enquiry\n\n` +
      `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\n` +
      `Subject: ${data.subject}\n\nMessage:\n${data.message}\n`,
  });
}

/** Auto-reply confirming receipt to whoever submitted the form. */
export async function sendAutoReply(data) {
  const transporter = getTransporter();

  const firstName = data.fullName.split(' ')[0];

  const html = layout('Message Received', `
    <h1 style="margin:0 0 16px;font-size:22px;color:#fff;">Thanks for reaching out, ${esc(firstName)}!</h1>
    <p style="color:#bbb;font-size:14px;line-height:1.7;margin:0 0 18px;">
      I have received your message and will get back to you within 24&ndash;48 hours.
      Here is a copy of what you sent:
    </p>
    <div style="padding:18px;background:#0a0a0a;border-left:3px solid ${BRAND};border-radius:8px;">
      <div style="color:#fff;font-size:14px;font-weight:bold;margin-bottom:8px;">${esc(data.subject)}</div>
      <div style="color:#999;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(data.message)}</div>
    </div>
    <p style="color:#bbb;font-size:14px;line-height:1.7;margin:22px 0 0;">
      Best regards,<br/><strong style="color:${BRAND};">${esc(OWNER_NAME)}</strong><br/>
      <span style="color:#666;font-size:13px;">Senior Frontend Developer</span>
    </p>
  `);

  return transporter.sendMail({
    from: MAIL_FROM || `"${OWNER_NAME}" <${SMTP_USER}>`,
    to: data.email,
    subject: `Thanks for getting in touch, ${firstName}`,
    html,
    text:
      `Thanks for reaching out, ${firstName}!\n\n` +
      `I have received your message and will get back to you within 24-48 hours.\n\n` +
      `Subject: ${data.subject}\n${data.message}\n\n— ${OWNER_NAME}`,
  });
}
