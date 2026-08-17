import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export const BLOG_POST_SLUGS = ["practice", "sound", "heritage"] as const;
export type BlogPostSlug = (typeof BLOG_POST_SLUGS)[number];

const IMAGES: Record<BlogPostSlug, string> = {
  practice: "/images/piano-keys.jpg",
  sound: "/images/lecture-hall.jpg",
  heritage: "/images/traditional-dance.jpg",
};

export type BlogPost = {
  slug: BlogPostSlug;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  body: string[];
};

export async function getBlogPosts(locale: AppLocale): Promise<BlogPost[]> {
  const t = await getTranslations({ locale, namespace: "blog.posts" });

  return BLOG_POST_SLUGS.map((slug) => ({
    slug,
    title: t(`${slug}.title`),
    excerpt: t(`${slug}.excerpt`),
    date: t(`${slug}.date`),
    image: IMAGES[slug],
    body: t.raw(`${slug}.body`) as string[],
  }));
}

export async function getBlogPost(
  locale: AppLocale,
  slug: string,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts(locale);
  return posts.find((post) => post.slug === slug) ?? null;
}
