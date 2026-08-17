"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { GraduationCap, Play, Users } from "lucide-react";

const BAR_HEIGHTS = [0.4, 0.75, 0.5, 0.95, 0.6, 0.8, 0.45, 0.7, 0.35, 0.65];

function Waveform() {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {BAR_HEIGHTS.map((height, index) => (
        <motion.span
          key={index}
          className="w-2 rounded-full bg-primary/70"
          style={{ height: `${height * 100}%` }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export function HeroVisual() {
  const t = useTranslations("hero.visual");

  return (
    <div className="relative mx-auto w-full max-w-md py-8">
      <motion.div
        className="rounded-2xl border bg-card p-6 shadow-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="size-4" fill="currentColor" strokeWidth={0} />
          </span>
          <div>
            <p className="text-sm font-semibold">{t("live")}</p>
            <p className="text-xs text-muted-foreground">{t("instrument")}</p>
          </div>
        </div>
        <div className="mt-6">
          <Waveform />
        </div>
      </motion.div>

      <motion.div
        className="absolute -top-6 -right-4 w-48 rounded-xl border bg-card p-4 shadow-lg sm:-right-8"
        initial={{ opacity: 0, y: 10, rotate: -3 }}
        animate={{ opacity: 1, y: [0, -6, 0], rotate: -3 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
        }}
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="size-4 text-primary" />
          <p className="text-xs font-medium">{t("progress")}</p>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[72%] rounded-full bg-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-6 -left-4 flex items-center gap-2 rounded-xl border bg-card px-4 py-3 shadow-lg sm:-left-8"
        initial={{ opacity: 0, y: -10, rotate: 3 }}
        animate={{ opacity: 1, y: [0, 6, 0], rotate: 3 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.8 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <Users className="size-4 text-primary" />
        <p className="text-xs font-medium">{t("community")}</p>
      </motion.div>
    </div>
  );
}
