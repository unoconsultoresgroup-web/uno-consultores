import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.PROPOSAL_TO_EMAIL || "alanvera48@gmail.com";
const FROM = process.env.PROPOSAL_FROM_EMAIL || "uno consultores <onboarding@resend.dev>";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrconsultores.com").replace(/\/$/, "");

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  unit?: string;
  message?: string;
};

/** Escapa HTML para evitar inyección en el cuerpo del email. */
function esc(value: string | undefined): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildHtml(data: Payload): string {
  const row = (label: string, value: string | undefined, isMessage = false) => {
    const clean = esc(value);
    if (!clean) return "";
    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #efe7e0;vertical-align:top;width:160px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#9b3cdf;">${label}</span>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid #efe7e0;color:#241b17;font-size:15px;line-height:1.55;${isMessage ? "white-space:pre-wrap;" : ""}">${clean}</td>
      </tr>`;
  };

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva petición de propuesta</title>
</head>
<body style="margin:0;padding:0;background:#f4eee8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4eee8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px -28px rgba(36,27,23,.4);">
          <!-- Header con logo -->
          <tr>
            <td style="background:#9b3cdf;padding:28px 36px;text-align:center;">
              <img src="${SITE_URL}/logo-sin-fondo-ezgif.com-crop.png" alt="üno consultores" width="150" style="display:inline-block;max-width:150px;height:auto;" />
            </td>
          </tr>
          <!-- Título -->
          <tr>
            <td style="padding:32px 36px 8px;">
              <h1 style="margin:0;font-size:21px;color:#241b17;font-weight:700;">Nueva petición de propuesta</h1>
              <p style="margin:8px 0 0;color:#8a7d74;font-size:14px;">Recibiste una nueva solicitud desde el sitio web.</p>
            </td>
          </tr>
          <!-- Datos -->
          <tr>
            <td style="padding:16px 36px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Nombre", data.name)}
                ${row("Empresa", data.company)}
                ${row("Email", data.email)}
                ${row("Teléfono", data.phone)}
                ${row("Servicio", data.unit)}
                ${row("Mensaje", data.message, true)}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#faf6f2;padding:20px 36px;text-align:center;border-top:1px solid #efe7e0;">
              <p style="margin:0;color:#8a7d74;font-size:12px;line-height:1.6;">
                uno consultores · Talento y tecnología en una sola firma<br/>
                Este email se generó automáticamente desde el formulario de propuestas.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "El servicio de email no está configurado." },
      { status: 500 },
    );
  }

  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Validación mínima.
  if (!data.name?.trim()) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  if (!data.email?.trim() || !isValidEmail(data.email.trim())) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email.trim(),
      subject: "Nueva petición de propuesta",
      html: buildHtml(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el email.", detail: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Proposal send failed:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el email." },
      { status: 500 },
    );
  }
}
