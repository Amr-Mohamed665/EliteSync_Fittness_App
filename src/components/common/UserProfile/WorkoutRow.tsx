import { Clock, Flame, Dumbbell } from "lucide-react";

interface WorkoutRowProps {
  title: string;
  date: string;
  duration: string;
  cals: number;
}

export default function WorkoutRow({
  title,
  date,
  duration,
  cals,
}: WorkoutRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl px-3 sm:px-6 py-4 sm:py-5 bg-[#1a1a1a] hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group cursor-pointer gap-3 sm:gap-0">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
          <Dumbbell size={18} className="text-primary sm:hidden" />
          <Dumbbell size={22} className="text-primary hidden sm:block" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold text-base sm:text-lg group-hover:text-primary transition-colors duration-300 truncate max-w-[120px] sm:max-w-none">
            {title}
          </span>
          <span className="text-xs sm:text-sm text-[#a1a1a1]">{date}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-8 ml-auto">
        <div className="flex items-center gap-1 sm:gap-2 text-[#a1a1a1] hidden sm:flex">
          <Clock size={16} />
          <span className="font-medium">{duration}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
          <Flame size={14} className="text-primary sm:hidden" />
          <Flame size={16} className="text-primary hidden sm:block" />
          <span className="text-sm sm:text-base font-bold text-primary">{cals} kcal</span>
        </div>
      </div>
    </div>
  );
}
