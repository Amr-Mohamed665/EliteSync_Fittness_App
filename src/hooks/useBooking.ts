import { useState } from "react";
import axiosInstance from "@/lib/Axios/axiosInstance";

export type BookingPayload = {
  payment_method: "card" | "paypal" | "vodafone";
};

export type BookingResponse = {
  message: string;
  booking_id?: number | string;
  [key: string]: unknown;
};

const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (
    payload: BookingPayload,
  ): Promise<BookingResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<BookingResponse>("api/bookings", payload);
      return response.data;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Booking request failed.";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};

export default useBooking;
