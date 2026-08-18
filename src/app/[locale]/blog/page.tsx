import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { getBlogPosts } from "@/modules/blog/posts";
import type { AppLocale } from "@/i18n/routing";

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale as AppLocale);
  const [featured, ...rest] = posts;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t("pageTitle")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("pageDescription")}</p>
        </Reveal>

        {featured && (
          <Reveal className="mt-14">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={featured.image}
                  alt=""
                  width={1200}
                  height={700}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                  <p className="text-xs font-semibold text-primary-foreground/80">
                    {featured.date}
                  </p>
                  <h2 className="mt-2 max-w-xl text-2xl font-bold text-white sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                    {featured.excerpt}
                  </p>
                  <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white">
                    {t("readMore")}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <StaggerGroup className="mt-6 divide-y divide-border border-t border-border">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-center"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-44">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 176px, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <ArrowRight className="hidden size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary sm:block" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
