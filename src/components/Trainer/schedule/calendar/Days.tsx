import { getDaysInMonth } from "@/components/utils";
import { getScheduleForDate } from "@/components/utils/scheduleUtils";
import type {
  Availability,
  AvailabilityException,
} from "@/lib/types/Trainer/TrainerTypes";

interface Props {
  currentMonth: Date;
  startDate: Date | null;
  availability: Availability[];
  availability_exceptions: AvailabilityException[];
  handleDayClick: (thisDate: Date) => void;
}

const Days = ({
  currentMonth,
  startDate,
  availability_exceptions,
  availability,
  handleDayClick,
}: Props) => {
  const daysInMonth = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <>
      {days.map((day: number) => {
        const thisDate = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day,
        );

        const info = getScheduleForDate(
          thisDate,
          availability,
          availability_exceptions,
        );

        const isDisabled = !info.isAvailable;
        const isSelected =
          startDate?.toDateString() === thisDate.toDateString();

        return (
          <button
            key={day}
            disabled={isDisabled}
            onClick={() => handleDayClick(thisDate)}
            title={
              isDisabled && info.reason
                ? `Unavailable: ${info.reason}`
                : undefined
            }
            className={`relative p-2.5 w-10 h-fit text-sm transition-all rounded-full
                    ${
                      isDisabled
                        ? "text-red-600 bg-red-400/20 cursor-not-allowed rounded-full "
                        : ""
                    }
                    ${
                      !isDisabled && !isSelected
                        ? "text-white hover:bg-white/10"
                        : ""
                    }
                    ${
                      isSelected
                        ? "bg-[#e8453c] text-white font-semibold z-10"
                        : ""
                    }
                  `}
          >
            {day}
          </button>
        );
      })}
    </>
  );
};

export default Days;
