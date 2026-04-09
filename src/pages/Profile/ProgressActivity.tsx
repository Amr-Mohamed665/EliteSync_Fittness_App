import { Flame, Package, Clock } from "lucide-react";
import LineChartComponent from "@/pages/Profile/LineChartComponent";
import { useQuery } from "@tanstack/react-query";
import { getProgressActivity } from "@/lib/Api/Authentication/profile";

interface Workout {
  name: string;
  date: string;
  time: string;
  kcal: number;
}

interface ProgressData {
  streak: number;
  total_sessions: number;
  avg_weekly: number;
  chart_data: { month: string; value: number }[];
  recent_workouts: Workout[];
}

export default function ProgressActivity() {
  const { data: stats, isLoading } = useQuery<ProgressData>({
    queryKey: ["profile-progress-activity"],
    queryFn: getProgressActivity,
  });

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Progress & Activity</h1>
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-[#FF4D4D] bg-[#FF4D4D0D] p-4 rounded-xl h-24"></div>
          ))}
        </div>
        <div className="animate-pulse border border-[#A7A7A7] rounded-2xl p-6 h-64"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Progress & Activity</h1>
        <p className="text-[#A7A7A7]">No progress data available</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 mt-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Progress & Activity</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {[
          { icon: Flame, title: "Current Streak", value: `${stats.streak || 0} Weeks` },
          { icon: Package, title: "Total Sessions", value: stats.total_sessions || 0 },
          { icon: Clock, title: "Avg. Weekly", value: stats.avg_weekly || 0 },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="border border-[#FF4D4D] bg-[#FF4D4D0D] p-4 rounded-xl flex items-center gap-3">
              <Icon size={16} strokeWidth={0.7} className=" w-10 h-10" />
              <div>
                <p className=" text-lg">{c.title}</p>
                <p className="text-xl font-semibold">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <LineChartComponent data={stats.chart_data || []} />
      <div className="border border-[#A7A7A7] rounded-2xl p-6">
        <h2 className="mb-4 text-2xl">Recent Workout History</h2>

        <div className="space-y-3">
          {stats.recent_workouts?.map((w: Workout, i: number) => (
            <div key={i} className="bg-[#2D2D2D] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-base sm:text-lg mb-1">{w.name}</p>
                <p className="text-[#A7A7A7] text-xs">{w.date}</p>
              </div>
              <div className="flex gap-4 text-sm sm:text-lg shrink-0">
                <span>{w.time}</span>
                <span className="text-red-400">{w.kcal} kcal</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}