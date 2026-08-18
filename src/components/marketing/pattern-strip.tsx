"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Decorative woven-ribbon strip: alternating triangles in the brand's
 * two accent hues, evoking the geometric bands common across African
 * textile traditions (kente, bogolan) without reproducing any specific
 * sacred or culturally-restricted symbol.
 */
export function PatternStrip({ className }: { className?: string }) {
  const patternId = useId();

  return (
    <svg
      aria-hidden
      className={cn("block h-3 w-full", className)}
      preserveAspectRatio="none"
      viewBox="0 0 32 16"
    >
      <defs>
        <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
          <polygon points="0,16 8,0 16,16" fill="var(--primary)" />
          <polygon points="8,0 16,16 24,0" fill="var(--chart-5)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
