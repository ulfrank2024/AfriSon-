import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Link } from "@/i18n/navigation";
import { getBlogPost, BLOG_POST_SLUGS } from "@/modules/blog/posts";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POST_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");
  const post = await getBlogPost(locale as AppLocale, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>

        <p className="mt-6 text-sm text-muted-foreground">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
          <Image src={post.image} alt="" fill sizes="768px" className="object-cover" />
        </div>

        <div className="mt-10">
          {post.body.map((paragraph, index) => (
            <p key={index} className="mb-5 text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
