import "server-only";
import { isBrevoConfigured } from "./config";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export type SendEmailResult = { ok: boolean };

/**
 * Sends a transactional email via Brevo's REST API. No-ops (returns
 * ok:false) when BREVO_API_KEY isn't set, and never throws — a failed
 * or skipped notification must never break the admin action that
 * triggered it (status update, course review, etc.).
 */
export async function sendEmail({
  to,
  subject,
  htmlContent,
}: {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}): Promise<SendEmailResult> {
  if (!isBrevoConfigured) {
    return { ok: false };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@afrisonacademy.com";
  const senderName = process.env.BREVO_SENDER_NAME || "AfriSon Academy";

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [to],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      console.error("Brevo send failed:", response.status, await response.text().catch(() => ""));
    }
    return { ok: response.ok };
  } catch (error) {
    console.error("Brevo send error:", error);
    return { ok: false };
  }
}
