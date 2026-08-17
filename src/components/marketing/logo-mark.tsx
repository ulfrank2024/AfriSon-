import { AudioWaveform } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-5 text-primary-foreground",
        className,
      )}
    >
      <AudioWaveform className="size-4.5" strokeWidth={2.5} />
    </span>
  );
}
