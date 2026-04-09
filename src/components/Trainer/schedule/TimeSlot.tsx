import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ScheduleInfo } from "@/lib/types/Trainer/TrainerTypes";

interface Props {
  timeSlots: string[];
  selectedTime: string | null;
  setSelectedTime: (t: string) => void;
  scheduleInfo: ScheduleInfo | null;
  startDate: Date | null;
}

const TimeSlot = ({
  timeSlots,
  selectedTime,
  setSelectedTime,
  scheduleInfo,
  startDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:w-52 flex flex-col">
      <p className="text-xs text-white/40 font-medium mb-2 uppercase tracking-widest">
        Time
      </p>

      <button
        disabled={
          startDate === null ||
          (scheduleInfo !== null && scheduleInfo.isAvailable === false)
        }
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium mb-3 hover:bg-white/10 transition-colors"
      >
        <span className={!selectedTime ? "text-white/40" : ""}>
          {selectedTime ?? "Select time"}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {!startDate && (
        <p className="text-xs text-white/30 px-1">Select a date first.</p>
      )}

      {startDate && scheduleInfo && !scheduleInfo.isAvailable && (
        <p className="text-xs text-[#e8453c] px-1">
          Unavailable{scheduleInfo.reason ? `: ${scheduleInfo.reason}` : ""}.
        </p>
      )}

      {isOpen && (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-64 pr-1">
          {timeSlots.length === 0 && (
            <p className="text-xs text-white/30 px-1">No time available.</p>
          )}
          {timeSlots.map((t) => {
            const isSelected = selectedTime === t;
            const isSlotDisabled =
              startDate === null || (scheduleInfo !== null && scheduleInfo.isAvailable === false);
            return (
              <button
                key={t}
                disabled={isSlotDisabled}
                onClick={() => {
                  setSelectedTime(t);
                }}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all border
                  ${
                    isSelected
                      ? "bg-[#e8453c] border-[#e8453c] text-white"
                      : isSlotDisabled
                        ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed"
                        : "bg-black border-white/10 text-white hover:bg-white/10"
                  }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
