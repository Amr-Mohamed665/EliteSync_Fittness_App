import type { Availability, AvailabilityException, ScheduleInfo } from "@/lib/types/Trainer/TrainerTypes";

const DAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getScheduleForDate(
  date: Date,
  availability: Availability[],
  exceptions: AvailabilityException[],
): ScheduleInfo {
  const dateStr = date.toISOString().split("T")[0];

  const exception = exceptions.find((e) => e.date.split("T")[0] === dateStr);
  if (exception) {
    return {
      isException: true,
      isAvailable: exception.is_available,
      start_time: exception.start_time,
      end_time: exception.end_time,
      reason: exception.reason,
    };
  }

  const dayName = DAY_NAMES[date.getDay()];
  const daySchedule = availability.find(
    (a) => a.day_of_week.toLowerCase() === dayName && a.is_active,
  );

  return {
    isException: false,
    isAvailable: !!daySchedule,
    start_time: daySchedule?.start_time ?? null,
    end_time: daySchedule?.end_time ?? null,
  };
}

export function generateTimeSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let h = sh,
    m = sm;
  while (h < eh || (h === eh && m < em)) {
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    slots.push(
      `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`,
    );
    m += 30;
    if (m >= 60) {
      m -= 60;
      h++;
    }
  }
  return slots;
}
