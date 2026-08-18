"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { UserPlus, CreditCard, PlayCircle, Trophy } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { key: "signup", icon: UserPlus },
  { key: "plan", icon: CreditCard },
  { key: "learn", icon: PlayCircle },
  { key: "stage", icon: Trophy },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t("title")}
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* Track (desktop: horizontal, mobile: vertical) */}
        <div
          aria-hidden
          className="absolute top-7 right-0 left-0 hidden h-0.5 bg-border sm:block"
        />
        <motion.div
          aria-hidden
          className="absolute top-7 left-0 hidden h-0.5 origin-left bg-primary sm:block"
          style={{ right: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        />
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-7 w-0.5 bg-border sm:hidden"
        />
        <motion.div
          aria-hidden
          className="absolute top-0 left-7 w-0.5 origin-top bg-primary sm:hidden"
          style={{ bottom: 0 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        />

        <div className="relative grid gap-10 sm:grid-cols-4 sm:gap-6">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.key}
              className="relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:text-center"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.18 * index }}
            >
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md">
                <step.icon className="size-6" />
              </span>
              <div className="sm:mt-4">
                <p className="text-xs font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-semibold">{t(`steps.${step.key}.title`)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
