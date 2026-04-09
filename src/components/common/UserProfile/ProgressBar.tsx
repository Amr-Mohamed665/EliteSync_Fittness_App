// ProgressBar.tsx
interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const completed = total - current;
  const percentage = Math.min((completed / total) * 100, 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-white">{current}</span>
          <span className="text-sm text-[#a1a1a1] ml-2">
            sessions remaining
          </span>
        </div>
        <span className="text-sm font-semibold text-primary">
          {completed} / {total} completed
        </span>
      </div>

      <div className="w-full h-2.5 bg-[#a1a1a1]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
