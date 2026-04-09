import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface Props {
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthName: string;
  year: number;
}

const Months = ({ setCurrentMonth, monthName, year }: Props) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <button
        className="text-white/40 hover:text-white transition-colors"
        onClick={() =>
          setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1))
        }
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-white font-semibold text-sm tracking-wide">
        {monthName} {year}
      </span>
      <button
        className="text-white/40 hover:text-white transition-colors"
        onClick={() =>
          setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1))
        }
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Months;
