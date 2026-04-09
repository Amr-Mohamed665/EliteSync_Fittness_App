import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/lib/Api/Authentication/profile";
import { toast } from "sonner";

interface BookingData {
  trainer_id: string | number;
  date: string;
  time: string;
  [key: string]: any;
}

const useCreateBooking = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: BookingData) => {
      console.log("Creating booking with data:", data);
      const result = await createBooking(data);
      console.log("Booking created:", result);
      return result;
    },
    onSuccess: () => {
      toast.success("Booking created successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to create booking:", error);
      if (error.response?.data) {
        console.error("Validation errors:", error.response.data);
      }
      toast.error(
        error?.response?.data?.message || error.message || "Failed to create booking",
      );
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export default useCreateBooking;
