import type { IncomingMessage, ServerResponse } from 'node:http';

interface ContactPayload {
  name?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
  website?: string; // honeypot antispam
}

const ALLOWED_INQUIRY_TYPES: Record<string, string> = {
  fabricacion: 'Fabricación',
  instalacion: 'Instalación',
  reparacion: 'Reparación',
  otra: 'Otra consulta',
};

function sendJson(res: ServerResponse, statusCode: number, body: Record<string, unknown>): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function readJsonBody(
  req: IncomingMessage & { body?: unknown }
): Promise<ContactPayload> {
  if (req.body && typeof req.body === 'object') {
    return req.body as ContactPayload;
  }
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as ContactPayload;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  return JSON.parse(raw) as ContactPayload;
}

export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Método no permitido.' });
    return;
  }

  let payload: ContactPayload;
  try {
    payload = await readJsonBody(req);
  } catch {
    sendJson(res, 400, { ok: false, error: 'Formato JSON inválido.' });
    return;
  }

  // Honeypot antispam: si un bot completa el campo oculto, responde OK sin enviar correo
  if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const inquiryKey = typeof payload.inquiryType === 'string' ? payload.inquiryType.trim() : 'otra';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (name.length < 2 || name.length > 120) {
    sendJson(res, 400, { ok: false, error: 'Nombre inválido.' });
    return;
  }

  const cleanDigits = phone.replace(/\D/g, '');
  if (cleanDigits.length < 8 || phone.length > 40) {
    sendJson(res, 400, { ok: false, error: 'Teléfono o WhatsApp inválido.' });
    return;
  }

  if (message.length < 10 || message.length > 3000) {
    sendJson(res, 400, { ok: false, error: 'El mensaje debe tener entre 10 y 3000 caracteres.' });
    return;
  }

  const inquiryLabel = ALLOWED_INQUIRY_TYPES[inquiryKey] ?? ALLOWED_INQUIRY_TYPES.otra;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    sendJson(res, 503, {
      ok: false,
      code: 'EMAIL_NOT_CONFIGURED',
      error: 'Falta configurar RESEND_API_KEY en las variables de entorno de Vercel.',
    });
    return;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'Eurotermochiloe@gmail.com';
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || 'Eurotermochiloe Web <onboarding@resend.dev>';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #1E1B18; max-width: 600px; line-height: 1.5;">
      <h2 style="color: #145A36; margin-bottom: 16px;">Nueva consulta desde Eurotermochiloe Web</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 160px;">Nombre</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Teléfono / WhatsApp</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Tipo de consulta</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(inquiryLabel)}</td>
        </tr>
      </table>
      <p style="font-weight: bold; margin-bottom: 6px;">Mensaje:</p>
      <div style="padding: 12px; background: #F8FAF8; border: 1px solid #C8E6C9; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;

  const textBody = [
    'Nueva consulta desde Eurotermochiloe Web',
    `Nombre: ${name}`,
    `Teléfono / WhatsApp: ${phone}`,
    `Tipo de consulta: ${inquiryLabel}`,
    '',
    'Mensaje:',
    message,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `[Web Eurotermochiloe] Consulta de ${inquiryLabel} — ${name}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorText);
      sendJson(res, 502, {
        ok: false,
        error: 'El proveedor de correo rechazó el envío. Revisa la configuración de Resend en Vercel.',
      });
      return;
    }

    const data = (await resendResponse.json()) as { id?: string };
    sendJson(res, 200, { ok: true, id: data.id });
  } catch (err) {
    console.error('Contact handler error:', err);
    sendJson(res, 500, {
      ok: false,
      error: 'Ocurrió un error al conectar con el servicio de correo.',
    });
  }
}
