import { errorToast, successToast } from "@/components/toast/Toast";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import z from "zod";

export type CreateSessionPayload = {
  trainer_package_id: number;
  sessions: string[];
};

export const createSessionSchema = z.object({
  trainer_package_id: z.number({
    message: "Trainer package is required",
  }),

  sessions: z
    .array(z.string().min(1, "Session date is required"))
    .min(1, "At least one session is required"),
});

async function bookSchedule(data: CreateSessionPayload) {
  const res = await axiosInstance.post("/api/bookings/schedule", data);
  return res.data;
}

export function useBookSchedule() {
  return useMutation({
    mutationKey: ["book-schedule"],
    mutationFn: (data: CreateSessionPayload) => bookSchedule(data),
    onSuccess: () => {
      successToast("Booked Successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || "Failed to book schedule";
      errorToast(message);
    },
  });
}

type ErrorResponse = {
  message?: string;
};
