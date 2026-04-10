import axiosInstance from "@/lib/Axios/axiosInstance";

export interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  transaction_id?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentHistoryResponse {
  status: boolean;
  message: string;
  payments: {
    data: Payment[];
    current_page: number;
    last_page: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    per_page: number;
    from: number | null;
    to: number | null;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
  };
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  description?: string;
}

export interface PaymentIntentResponse {
  status: boolean;
  message: string;
  data: {
    client_secret: string;
    payment_intent_id: string;
    amount: number;
    currency: string;
  };
}

export const getPaymentHistory = async (page: number = 1): Promise<PaymentHistoryResponse> => {
  const { data } = await axiosInstance.get<PaymentHistoryResponse>(`/api/payments-history?page=${page}`);
  return data;
};

export const createPaymentIntent = async (request: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> => {
  const { data } = await axiosInstance.post<PaymentIntentResponse>("/api/payments/create-intent", request);
  return data;
};

export const confirmPayment = async (paymentIntentId: string): Promise<{ status: boolean; message: string }> => {
  const { data } = await axiosInstance.post(`/api/payments/confirm/${paymentIntentId}`);
  return data;
};

export interface PayBookingRequest {
  payment_method: string; // 'card' | 'paypal' | 'vodafone'
  card_id?: number;
}

export interface PayBookingResponse {
  status: boolean;
  message: string;
  data?: {
    booking_id?: number;
    payment_status?: string;
    [key: string]: any;
  };
}

export const payBooking = async (
  bookingId: number | string,
  payload: PayBookingRequest
): Promise<PayBookingResponse> => {
  const { data } = await axiosInstance.post<PayBookingResponse>(
    `/api/bookings/${bookingId}/pay`,
    payload
  );
  return data;
};
