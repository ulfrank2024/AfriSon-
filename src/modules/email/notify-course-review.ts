import { sendEmail } from "./send-email";
import { renderEmail } from "./render-email";
import type { InterfaceLanguage } from "@/modules/auth/types";

const MESSAGES = {
  publie: {
    fr: { subject: "Ton cours est publié !", body: (title: string) => `Ton cours « ${title} » a été validé et est maintenant visible dans le catalogue élève.` },
    en: { subject: "Your course is live!", body: (title: string) => `Your course "${title}" has been approved and is now visible in the student catalogue.` },
  },
  rejete: {
    fr: { subject: "Ton cours a besoin d'ajustements", body: (title: string) => `Ton cours « ${title} » a été renvoyé pour ajustements avant publication.` },
    en: { subject: "Your course needs a few changes", body: (title: string) => `Your course "${title}" was sent back for a few changes before it can be published.` },
  },
} as const;

export async function notifyCourseReviewDecision({
  email,
  fullName,
  courseTitle,
  decision,
  adminNotes,
  language,
}: {
  email: string;
  fullName: string;
  courseTitle: string;
  decision: "publie" | "rejete";
  adminNotes: string | null;
  language: InterfaceLanguage;
}) {
  const message = MESSAGES[decision][language];

  await sendEmail({
    to: { email, name: fullName },
    subject: message.subject,
    htmlContent: renderEmail({
      preheader: message.subject,
      bodyHtml: `
        <p>${language === "fr" ? `Bonjour ${fullName},` : `Hi ${fullName},`}</p>
        <p>${message.body(courseTitle)}</p>
        ${
          adminNotes
            ? `<p style="background-color:#f5f1eb;border-radius:8px;padding:12px 16px;">${language === "fr" ? "Note de l'équipe :" : "Note from the team:"} ${adminNotes}</p>`
            : ""
        }
      `,
    }),
  });
}
