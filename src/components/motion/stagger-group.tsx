"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const groupVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
});

const itemVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
});

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={groupVariants(staggerDelay)}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerItem({ children, className, y = 16 }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants(y)}>
      {children}
    </motion.div>
  );
}
