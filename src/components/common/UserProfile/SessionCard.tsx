import { Clock, MapPin, NotepadText, Trash2 } from "lucide-react";
import ActionButton from "./ActionButton";

interface SessionCardProps {
  sessionName: string;
  trainerName: string;
  date: string | null;
  time: string | null;
  location: string;
  onReschedule?: () => void;
  onViewDetails?: () => void;
  onCancel?: () => void;
}

export default function SessionCard({
  sessionName,
  trainerName,
  date,
  time,
  location,
  onReschedule,
  onViewDetails,
  onCancel,
}: SessionCardProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-[#a1a1a1] rounded-xl p-4 sm:p-5 gap-4">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#a1a1a1] text-lg font-semibold shrink-0">
          {(trainerName || "").charAt(0)}
        </div>

        <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
          <span className="font-semibold text-white text-base sm:text-xl truncate">
            {sessionName}
          </span>
          <span className="text-sm text-[#a1a1a1] truncate">
            with {trainerName}
          </span>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-1 text-xs sm:text-sm text-[#a1a1a1]">
            {date && (
              <span className="flex items-center gap-1 shrink-0">
                <NotepadText size={14} />
                {date}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1 shrink-0">
                <Clock size={12} />
                {time}
              </span>
            )}
            <span className="flex items-center gap-1 w-full sm:w-auto overflow-hidden">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{location}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-800 sm:border-t-0 sm:shrink-0 justify-center">
        {date && onReschedule && (
          <ActionButton
            text="Reschedule"
            variant="outline"
            width="w-auto"
            size="sm"
            onClick={onReschedule}
          />
        )}
        <ActionButton
          text="Details"
          width="w-auto"
          size="sm"
          onClick={onViewDetails}
        />
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-3.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 shrink-0 flex items-center justify-center"
            aria-label="Cancel session"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
