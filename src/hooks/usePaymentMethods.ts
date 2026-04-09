import { useQuery } from "@tanstack/react-query";
import { getBillingPage } from "@/lib/Api/Authentication/profile";

export interface PaymentMethod {
  id: number;
  card_type: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

export interface BillingData {
  payment_methods: PaymentMethod[];
  default_payment_method?: PaymentMethod;
}

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ["profile-payment-methods"],
    queryFn: getBillingPage,
  });
};

export default usePaymentMethods;
