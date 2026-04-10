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
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#a1a1a1] text-lg font-semibold shrink-0">
          {(trainerName || "").charAt(0)}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-white text-base sm:text-xl">
            {sessionName}
          </span>
          <span className="text-sm text-[#a1a1a1]">
            with {trainerName}
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[#a1a1a1]">
            {date && (
              <span className="flex items-center gap-1">
                <NotepadText size={14} />
                {date}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {time}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:shrink-0">
        {date && onReschedule && (
          <ActionButton
            text="Reschedule"
            variant="outline"
            width="w-full sm:w-28"
            onClick={onReschedule}
          />
        )}
        <ActionButton
          text="Details"
          width="w-full sm:w-28"
          onClick={onViewDetails}
        />
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            aria-label="Cancel session"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
