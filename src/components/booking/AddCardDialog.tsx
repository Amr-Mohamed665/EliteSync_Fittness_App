import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  AddNewCardSchema,
  type AddNewCardType,
} from "@/lib/schemas/AddNewCardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCardInput from "./AddCardInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { toast } from "react-hot-toast";

import type { CardData } from "@/hooks/usePaymentCards";

type AddCardDialogProps = {
  isCardModalOpen: boolean;
  setIsCardModalOpen: (isCardModalOpen: boolean) => void;
  onCardAdded: (card: CardData) => void;
};

const AddCardDialog = ({
  isCardModalOpen,
  setIsCardModalOpen,
  onCardAdded,
}: AddCardDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: any) => {
      console.log("Sending card data to /api/cards:", data);
      const result = await axiosInstance.post("/api/cards", data);
      console.log("API response:", result.data);
      return result.data;
    },
    onSuccess: (_response: any, variables: any) => {
      toast.success("Card added successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      setIsCardModalOpen(false);
      onCardAdded({
        card_brand: variables.card_brand,
        card_last_four: variables.card_last_four,
        card_exp_month: variables.card_exp_month,
        card_exp_year: variables.card_exp_year,
        card_holder_name: variables.card_holder_name,
      });
    },
    onError: (error: any) => {
      console.error("Card add error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to add card",
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddNewCardType>({
    resolver: zodResolver(AddNewCardSchema),
  });

  const onSubmit = (data: AddNewCardType) => {
    const addCardData = {
      card_brand: data.cardType || "visa", // Use selected card type
      card_number: data.cardNumber.replace(/\s/g, ""), // Send full card number
      card_last_four: data.cardNumber.slice(-4),
      card_exp_month: Number(data.month),
      card_exp_year: Number(data.year),
      card_holder_name: data.cardName,
    };
    mutate(addCardData);
  };

  return (
    <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
      <DialogContent className="bg-gray-950 border-gray-600 sm:max-w-2xl text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-2">
            <h1 className="text-2xl font-bold text-center">Add New Card</h1>
            
            {/* Card Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Card Type
              </label>
              <select
                {...register("cardType")}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select card type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="discover">Discover</option>
              </select>
              {errors.cardType && (
                <p className="text-red-500 text-sm mt-1">{errors.cardType.message}</p>
              )}
            </div>

            <div>
              <AddCardInput
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                register={register("cardNumber")}
                error={errors.cardNumber?.message}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <AddCardInput
                  id="cardName"
                  type="text"
                  placeholder="John Doe"
                  register={register("cardName")}
                  error={errors.cardName?.message}
                />
              </div>
              <div className="w-1/2">
                <AddCardInput
                  id="cvv"
                  type="text"
                  placeholder="Cvv: 123"
                  register={register("cvv")}
                  error={
                    errors.cvv?.message || error?.response?.data?.errors?.cvv
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <AddCardInput
                  id="expiry"
                  type="text"
                  placeholder="05"
                  register={register("month")}
                  error={
                    errors.month?.message ||
                    error?.response?.data?.errors?.card_exp_month
                  }
                />
              </div>
              <div className="w-1/2">
                <AddCardInput
                  id="expiry"
                  type="text"
                  placeholder="2032"
                  register={register("year")}
                  error={
                    errors.year?.message ||
                    error?.response?.data?.errors?.card_exp_year
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-stretch gap-2 mt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-2 rounded-md bg-orange text-white text-sm font-bold shadow-md hover:bg-orange/90 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Card"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;
