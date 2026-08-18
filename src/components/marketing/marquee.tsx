import type { ReactNode } from "react";

/** Full-bleed, seamlessly looping ticker. Breaks out of the parent's
 * max-width so it reads as a distinct band. Pauses on hover and
 * respects prefers-reduced-motion (see globals.css). */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max items-center gap-4 py-2 animate-marquee">
        {children}
        <div aria-hidden className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
