import type { ReactNode } from "react";

interface InfoTagCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export default function InfoTagCard({ icon, label, value }: InfoTagCardProps) {
  return (
    <div className="flex-1 group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="relative z-10 flex flex-col gap-3">
        
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-muted/60 border border-border/50">
          <span className="text-base font-semibold text-foreground">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
