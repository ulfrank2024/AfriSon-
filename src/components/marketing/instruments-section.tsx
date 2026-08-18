import { useTranslations } from "next-intl";
import Image from "next/image";
import { Drum, Guitar, SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBadge } from "./icon-badge";
import { Marquee } from "./marquee";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const CATEGORIES = [
  { key: "traditional", icon: Drum, image: "/images/djembe.jpg" },
  { key: "modern", icon: Guitar, image: "/images/guitar-lesson.jpg" },
  { key: "sound", icon: SlidersHorizontal, image: "/images/mixing-console.jpg" },
] as const;

const GALLERY = [
  { key: "djembe", image: "/images/djembe-hands.jpg" },
  { key: "acoustic", image: "/images/acoustic-guitar.jpg" },
  { key: "electric", image: "/images/electric-guitar.jpg" },
  { key: "bass", image: "/images/bass-guitar.jpg" },
  { key: "drums", image: "/images/drums.jpg" },
  { key: "keyboard", image: "/images/keyboard.jpg" },
] as const;

const STUDIO_IMAGES = [
  "/images/mixing-console-2.jpg",
  "/images/mixing-board-green.jpg",
  "/images/mixer-shallow-focus.jpg",
  "/images/mixer-closeup.jpg",
  "/images/audio-controller.jpg",
];

export function InstrumentsSection() {
  const t = useTranslations("instruments");

  return (
    <section id="instruments" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <StaggerItem key={category.key}>
              <Card className="group h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <IconBadge
                    icon={category.icon}
                    className="absolute -bottom-5 left-4 border-4 border-card bg-primary text-primary-foreground"
                  />
                </div>
                <CardHeader className="pt-8">
                  <CardTitle>{t(`${category.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${category.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pb-6">
                  {t.raw(`${category.key}.examples`).map((example: string) => (
                    <Badge key={example} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-20">
          <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {t("galleryTitle")}
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          staggerDelay={0.06}
        >
          {GALLERY.map((item) => (
            <StaggerItem key={item.key}>
              <div className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <p className="absolute right-2 bottom-2 left-2 text-xs font-semibold text-white sm:text-sm">
                  {t(`gallery.${item.key}`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-20">
          <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {t("studioTitle")}
          </p>
          <div className="mt-6">
            <Marquee>
              {STUDIO_IMAGES.map((src) => (
                <div
                  key={src}
                  className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-72"
                >
                  <Image src={src} alt="" fill sizes="300px" className="object-cover" />
                </div>
              ))}
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
