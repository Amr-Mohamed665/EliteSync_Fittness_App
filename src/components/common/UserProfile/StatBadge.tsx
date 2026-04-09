import type { ReactNode } from "react";

interface StatBadgeProps {
  icon: ReactNode;
  label: string | number;
  value: string | number;
}

export default function StatBadge({ icon, label, value }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-4 bg-[#FF4D4D0D] border border-primary rounded-xl px-5 py-4 flex-1">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-[#a1a1a1] font-medium">{label}</span>
        <span className="font-bold text-2xl text-white">{value}</span>
      </div>
    </div>
  );
}
