import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { TeacherApplicationForm } from "@/modules/auth/teacher-application-form";

export default async function DevenirEnseignantPage({
  searchParams,
}: PageProps<"/[locale]/devenir-enseignant">) {
  const { filiere } = await searchParams;
  const defaultField = filiere === "son" ? "son" : "musique";

  return (
    <>
      <SiteHeader />
      <main>
        <TeacherApplicationForm defaultField={defaultField} />
      </main>
      <SiteFooter />
    </>
  );
}
