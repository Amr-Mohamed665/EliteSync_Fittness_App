import WorkoutRow from "../../components/common/UserProfile/WorkoutRow";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutHistory } from "@/lib/Api/Authentication/profile";

interface Workout {
  id?: string;
  title: string;
  date: string;
  duration: string;
  cals: number;
}

export default function WorkoutHistory() {
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["profile-workout-history"],
    queryFn: getWorkoutHistory,
  });

  // Handle different API response structures
  const workouts: Workout[] = Array.isArray(apiResponse) 
    ? apiResponse 
    : apiResponse?.data || apiResponse?.workouts || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 px-4 sm:px-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Workout History</h2>
          <p className="text-md pl-2 text-[#a1a1a1] mt-1">Your recent training sessions</p>
        </div>
        <div className="animate-pulse border border-[#a1a1a1] rounded-2xl h-64"></div>
      </div>
    );
  }

  if (!workouts || workouts.length === 0) {
    return (
      <div className="flex flex-col gap-8 px-4 sm:px-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Workout History</h2>
          <p className="text-md pl-2 text-[#a1a1a1] mt-1">Your recent training sessions</p>
        </div>
        <p className="text-[#a1a1a1] text-center py-8">No past sessions yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Workout History
        </h2>
        <p className="text-md pl-2 text-[#a1a1a1] mt-1">
          Your recent training sessions
        </p>
      </div>

      <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-3 sm:px-6 py-4 border-b border-[#a1a1a1] bg-[#1a1a1a]/40">
          <span className="text-xs sm:text-md font-bold uppercase tracking-widest text-[#a1a1a1]">
            Workout
          </span>
          <div className="flex items-center gap-2 sm:gap-8 pr-0 sm:pr-5">
            <span className="text-xs sm:text-md font-bold uppercase tracking-widest text-[#a1a1a1] hidden sm:block">
              Duration
            </span>
            <span className="text-xs sm:text-md font-bold uppercase tracking-widest text-[#a1a1a1]">
              Calories
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {workouts?.map((w) => (
            <WorkoutRow
              key={w.id || w.title}
              title={w.title}
              date={w.date}
              duration={w.duration}
              cals={w.cals}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
