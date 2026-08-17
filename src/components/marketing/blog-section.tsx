import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getBlogPosts } from "@/modules/blog/posts";
import type { AppLocale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

export async function BlogSection() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow group-hover:shadow-lg">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="gap-2 py-6">
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                  <CardTitle className="text-base leading-snug group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10 text-center">
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          {t("cta")}
        </Link>
      </Reveal>
    </section>
  );
}
