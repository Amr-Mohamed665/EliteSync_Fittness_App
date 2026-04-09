import { Clock, MapPin, NotepadText, Trash2 } from "lucide-react";
import ActionButton from "./ActionButton";

interface SessionCardProps {
  sessionName: string;
  trainerName: string;
  date: string;
  time: string;
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
          {(trainerName || "T").charAt(0)}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-white text-base sm:text-xl">
            {sessionName}
          </span>
          <span className="text-sm text-[#a1a1a1]">
            with {trainerName}
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#a1a1a1]">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <NotepadText size={14} className="text-red-500" />
              {date}
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock size={14} className="text-red-500" />
              {time}
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={14} className="text-red-500" />
              {location}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex items-center gap-4 sm:shrink-0">
        <ActionButton
          text="Reschedule"
          variant="outline"
          width="w-full sm:min-w-[150px] h-14 text-sm font-black"
          onClick={onReschedule}
        />
        <ActionButton
          text="View Details"
          width="w-full sm:min-w-[150px] h-14 text-sm font-black"
          onClick={onViewDetails}
        />
        <button 
          onClick={onCancel}
          className="w-14 h-14 flex items-center justify-center border border-red-900/50 rounded-lg text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shrink-0 shadow-md"
          title="Cancel Session"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
}
