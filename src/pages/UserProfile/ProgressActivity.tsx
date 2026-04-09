import { Clock, Flame, Package } from "lucide-react";
import StatBadge from "../../components/common/UserProfile/StatBadge";
import SessionsOverTime from "../../components/common/UserProfile/SessionOverTime";

interface ProgressActivityProps {
  sessionComplete: string;
  activePackage: number;
  nextSession: number;
}

export default function ProgressActivity({
  sessionComplete,
  activePackage,
  nextSession,
}: ProgressActivityProps) {
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">
        Progress & Activity
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <StatBadge
          icon={<Flame size={24} />}
          label="Current Streak"
          value={sessionComplete}
        />
        <StatBadge
          icon={<Package size={24} />}
          label="Total Sessions"
          value={activePackage}
        />
        <StatBadge
          icon={<Clock size={24} />}
          label="Avg. Weekly"
          value={nextSession}
        />
      </div>

      <SessionsOverTime />
    </div>
  );
}
