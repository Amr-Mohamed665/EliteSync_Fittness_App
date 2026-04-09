export function getDaysInMonth(currentMonth: Date) {
  return new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
}
export function getFirstDayOfWeek(currentMonth: Date) {
  return new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDate();
}
