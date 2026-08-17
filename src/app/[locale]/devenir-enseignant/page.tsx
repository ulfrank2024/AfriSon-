import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { TeacherApplicationForm } from "@/modules/auth/teacher-application-form";

export default function DevenirEnseignantPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <TeacherApplicationForm />
      </main>
      <SiteFooter />
    </>
  );
}
