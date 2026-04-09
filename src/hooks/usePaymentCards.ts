import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPaymentMethod } from "@/lib/Api/Authentication/profile";
import { toast } from "react-hot-toast";

export type CardData = {
  card_brand: string;
  card_last_four: string;
  card_exp_month: number;
  card_exp_year: number;
  card_holder_name: string;
};

const usePaymentCards = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: CardData) => {
      console.log("Sending card data:", data);
      const result = await addPaymentMethod(data);
      console.log("API response:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("Card added successfully:", data);
      toast.success("Card added successfully");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.refetchQueries({ queryKey: ["cards"] });
    },
    onError: (error: any) => {
      console.error("Failed to add card:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to add card",
      );
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export default usePaymentCards;
