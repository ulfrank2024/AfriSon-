import { sendEmail } from "./send-email";
import { renderEmail } from "./render-email";
import type { ApplicationStatus } from "@/modules/auth/types";

const MESSAGES: Record<ApplicationStatus, { subjectFr: string; bodyFr: string; subjectEn: string; bodyEn: string }> = {
  recu: {
    subjectFr: "Ta candidature a bien été reçue",
    bodyFr: "Merci pour ta candidature comme enseignant·e sur AfriSon Academy. Notre équipe va l'étudier et revient vers toi bientôt.",
    subjectEn: "We've received your application",
    bodyEn: "Thank you for applying to teach on AfriSon Academy. Our team will review it and get back to you soon.",
  },
  en_revue: {
    subjectFr: "Ta candidature est en cours de revue",
    bodyFr: "Ta candidature est actuellement en revue par notre équipe.",
    subjectEn: "Your application is under review",
    bodyEn: "Your application is currently being reviewed by our team.",
  },
  preselectionne: {
    subjectFr: "Ta candidature a été présélectionnée",
    bodyFr: "Bonne nouvelle : ta candidature a été présélectionnée ! Prochaine étape à venir.",
    subjectEn: "You've been shortlisted",
    bodyEn: "Good news: your application has been shortlisted! Next steps to follow.",
  },
  evaluation_planifiee: {
    subjectFr: "Une évaluation a été planifiée",
    bodyFr: "Une évaluation de tes compétences a été planifiée dans le cadre de ta candidature. Nous te contacterons avec les détails.",
    subjectEn: "An evaluation has been scheduled",
    bodyEn: "A skills evaluation has been scheduled as part of your application. We'll contact you with the details.",
  },
  entretien: {
    subjectFr: "Un entretien a été planifié",
    bodyFr: "Un entretien a été planifié dans le cadre de ta candidature. Nous te contacterons avec les détails.",
    subjectEn: "An interview has been scheduled",
    bodyEn: "An interview has been scheduled as part of your application. We'll contact you with the details.",
  },
  valide: {
    subjectFr: "Ta candidature est validée — bienvenue !",
    bodyFr: "Félicitations, ta candidature est validée ! Connecte-toi (ou crée ton compte avec cette même adresse email) pour accéder à ton espace enseignant et créer tes premiers cours.",
    subjectEn: "Your application is approved — welcome!",
    bodyEn: "Congratulations, your application has been approved! Sign in (or create an account with this same email) to access your teacher space and create your first courses.",
  },
  rejete: {
    subjectFr: "Réponse à ta candidature",
    bodyFr: "Après étude de ta candidature, nous ne pouvons pas y donner suite pour le moment. Merci pour ton intérêt envers AfriSon Academy.",
    subjectEn: "Update on your application",
    bodyEn: "After reviewing your application, we're unable to move forward at this time. Thank you for your interest in AfriSon Academy.",
  },
  en_attente_documents: {
    subjectFr: "Documents complémentaires requis",
    bodyFr: "Ta candidature nécessite des documents complémentaires. Notre équipe te contactera pour préciser lesquels.",
    subjectEn: "Additional documents needed",
    bodyEn: "Your application needs additional documents. Our team will contact you with the details.",
  },
};

export async function notifyApplicationStatusChange({
  email,
  fullName,
  status,
}: {
  email: string;
  fullName: string;
  status: ApplicationStatus;
}) {
  const message = MESSAGES[status];

  await sendEmail({
    to: { email, name: fullName },
    subject: message.subjectFr,
    htmlContent: renderEmail({
      preheader: message.subjectFr,
      bodyHtml: `
        <p>Bonjour ${fullName},</p>
        <p>${message.bodyFr}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#8a8078;">Hi ${fullName},</p>
        <p style="color:#8a8078;">${message.bodyEn}</p>
      `,
    }),
  });
}
