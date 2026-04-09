import {  getFirstDayOfWeek } from "@/components/utils";
import type {
  Availability,
  AvailabilityException,
} from "@/lib/types/Trainer/TrainerTypes";
import Months from "./calendar/Months";
import Days from "./calendar/Days";

interface Props {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  currentMonth: Date;
  availability: Availability[];
  availability_exceptions: AvailabilityException[];
  onRangeChange: () => void;
}

const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

const Calendar = ({
  startDate,
  setStartDate,
  availability,
  availability_exceptions,
  onRangeChange,
  currentMonth,
  setCurrentMonth,
}: Props) => {
  const firstDayOfWeek = getFirstDayOfWeek(currentMonth);
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  function handleDayClick(thisDate: Date) {
    if (startDate && thisDate.toDateString() === startDate.toDateString()) {
      setStartDate(null);
    } else {
      setStartDate(thisDate);
    }

    onRangeChange?.();
  }

  return (
    <div className="flex-1">
      <Months
        monthName={monthName}
        year={year}
        setCurrentMonth={setCurrentMonth}
      />

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {weekDays.map((d) => (
          <div key={d} className="py-1 text-white/30 text-xs font-medium">
            {d}
          </div>
        ))}
        {blanks.map((b) => (
          <div key={`b-${b}`} />
        ))}
        <Days
          availability={availability}
          availability_exceptions={availability_exceptions}
          currentMonth={currentMonth}
          handleDayClick={handleDayClick}
          startDate={startDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
