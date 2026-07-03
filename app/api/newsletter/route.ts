import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const { email } = await request.json().catch(() => ({ email: undefined }));

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }

  // Punto de integración con el proveedor de newsletter (Mailchimp, Resend,
  // Brevo, etc.) configurado vía NEWSLETTER_PROVIDER / NEWSLETTER_API_KEY.
  // Se deja como stub para no acoplar el sitio a un proveedor específico.

  return NextResponse.json({ ok: true });
}
