import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPaymentMethod } from "@/lib/Api/Authentication/profile";
import { toast } from "react-hot-toast";

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      toast.success("Payment method added successfully");
      // Invalidate payment methods query to refresh data
      queryClient.invalidateQueries({ queryKey: ["profile-payment-methods"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Failed to add payment method",
      );
    },
  });

  return {
    addPaymentMethod: mutate,
    isAdding: isPending,
  };
};

export default useAddPaymentMethod;
