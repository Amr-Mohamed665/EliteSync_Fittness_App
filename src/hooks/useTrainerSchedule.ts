import { useQuery } from "@tanstack/react-query";
import { getTrainerSchedule } from "@/lib/Api/Authentication/profile";

export interface ScheduleSlot {
  id: number;
  time: string;
  date: string;
  is_available: boolean;
}

export interface TrainerSchedule {
  trainer_id: number;
  available_slots: ScheduleSlot[];
}

const useTrainerSchedule = (trainerId: string | number | undefined) => {
  const {
    data: schedule,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer-schedule", trainerId],
    queryFn: async () => {
      if (!trainerId) return null;
      const data = await getTrainerSchedule(trainerId);
      console.log("Trainer schedule response:", data);
      return data as TrainerSchedule;
    },
    enabled: !!trainerId,
  });

  const errorMessage = error instanceof Error ? error.message : null;

  // Extract unique available times for the selected date
  const getAvailableTimesForDate = (date: Date | undefined): string[] => {
    if (!date || !schedule?.available_slots) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    return schedule.available_slots
      .filter(slot => slot.date === dateStr && slot.is_available)
      .map(slot => slot.time);
  };

  return {
    schedule,
    isLoading,
    error: errorMessage,
    getAvailableTimesForDate,
  };
};

export default useTrainerSchedule;
