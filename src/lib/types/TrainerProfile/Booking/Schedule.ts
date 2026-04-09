export interface ScheduleData {
  trainer_id: number;
  schedule: Schedule[];
  exceptions: Exception[];
}

export interface Exception {
  date: Date;
  is_available: boolean;
  start_time: string | null;
  end_time: string | null;
  reason: string;
}

export interface Schedule {
  day_of_week: string;
  start_time: string;
  end_time: string;
}
