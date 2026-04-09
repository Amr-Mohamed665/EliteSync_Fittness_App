"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import useTrainerSchedule from "@/hooks/useTrainerSchedule";
import useCreateBooking from "@/hooks/useCreateBooking";
import { Skeleton } from "@/components/ui/skeleton";

import { timeSlots } from "@/components/lib/constants/Trainer/TrainerData";



interface ScheduleSessionProps {

  trainerId: string | number;

}



export default function ScheduleSession({ trainerId }: ScheduleSessionProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const { mutate: createBookingMutation, isPending: isCreatingBooking } = useCreateBooking();
  
  const { isLoading, error: scheduleError, getAvailableTimesForDate } = useTrainerSchedule(trainerId);

  const apiAvailableTimes = getAvailableTimesForDate(date);
  // Use mock time slots if API doesn't return any times
  const availableTimes = apiAvailableTimes.length > 0 ? apiAvailableTimes : timeSlots;

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setSelectedTime("");
  };

  const handleContinueBooking = () => {
    if (!date || !selectedTime) return;

    const dateStr =
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0');

    const bookingPayload = {
      trainer_id: trainerId,
      date: dateStr,
      time: selectedTime,
    };

    createBookingMutation(bookingPayload, {
      onSuccess: (response) => {
        const bookingData = {
          trainerId,
          date: dateStr,
          time: selectedTime,
          booking_id: response.data.id || response.data.booking_id,
        };
        sessionStorage.setItem('scheduledBooking', JSON.stringify(bookingData));
        navigate(`/booking/${trainerId}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container w-full sm:w-11/12 md:w-10/12 mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white w-fit mx-auto">Schedule your session</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="bg-zinc-800 rounded-xl p-4 lg:col-span-8">
            <Skeleton className="h-80 w-full bg-zinc-700" />
          </div>
          <div className="bg-zinc-800 rounded-xl p-4 space-y-3 lg:col-span-4">
            <Skeleton className="h-8 w-20 bg-zinc-700" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full bg-zinc-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (scheduleError) {
    return (
      <div className="container w-10/12 mx-auto text-center py-10">
        <h2 className="text-2xl text-red-500">Failed to load schedule</h2>
        <p className="text-gray-400 mt-2">{scheduleError}</p>
      </div>
    );
  }

  return (
    <div className="container w-full sm:w-11/12 md:w-10/12 mx-auto pt-8 sm:pt-10 md:pt-12">
      <h2 className="text-4xl font-bold text-white w-fit mx-auto">Schedule your session</h2>
      <p className="text-text-secondary text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] my-4 w-fit mx-auto">
        Pick your preferred date and start your fitness journey.
      </p>
      <div className="text-white p-4 sm:p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="bg-zinc-800 rounded-xl p-4 lg:col-span-8">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="w-full"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </div>

          <div className="bg-zinc-800 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 lg:col-span-4">
            <p className="text-gray-400 text-sm sm:text-base font-medium">Time</p>

            {!date ? (
              <p className="text-gray-500 text-xs sm:text-sm">Select a date to see available times</p>
            ) : availableTimes.length === 0 ? (
              <div className="text-center py-3 sm:py-4">
                <p className="text-gray-500 text-xs sm:text-sm mb-2">No available times for this date</p>
                <p className="text-gray-600 text-xs">Please try another date or contact the trainer directly</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`w-full text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4
                    ${
                      selectedTime === time
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-black text-white hover:bg-zinc-700"
                    }`}>
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-800 p-4 rounded-xl">
          <p className="text-gray-300">
            {date
              ? `${date.toDateString()} - ${selectedTime || "Select time"}`
              : "No date selected"}
          </p>

          <Button
            className="bg-primary hover:bg-red-600 px-6"
            disabled={!date || !selectedTime || isCreatingBooking}
            onClick={handleContinueBooking}>
            { isCreatingBooking ? "Creating..." : "Continue booking →" }
          </Button>
        </div>
      </div>
    </div>
  );
}

