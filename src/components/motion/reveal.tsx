"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Trigger when scrolled into view instead of on mount. */
  onView?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  onView = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      custom={y}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...(onView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  );
}
