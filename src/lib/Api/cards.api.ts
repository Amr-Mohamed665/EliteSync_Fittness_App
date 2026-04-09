import axiosInstance from "@/lib/Axios/axiosInstance";

export interface Card {
  id: number;
  card_type: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  card_holder_name?: string;
  is_default?: boolean;
  brand?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface CardsResponse {
  status: boolean;
  message: string;
  data: Card[];
}

export interface AddCardRequest {
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvv: string;
  card_holder_name: string;
  set_as_default?: boolean;
}

export interface AddCardResponse {
  status: boolean;
  message: string;
  data: Card;
}

export interface DeleteCardResponse {
  status: boolean;
  message: string;
}

export interface SetDefaultCardResponse {
  status: boolean;
  message: string;
}

export interface SingleCardResponse {
  status: boolean;
  message: string;
  data: Card;
}

export const getCard = async (cardId: number): Promise<SingleCardResponse> => {
  const { data } = await axiosInstance.get<SingleCardResponse>(`/api/cards/${cardId}`);
  return data;
};

export const getCards = async (): Promise<CardsResponse> => {
  const { data } = await axiosInstance.get<CardsResponse>("/api/cards");
  return data;
};

export const addCard = async (request: AddCardRequest): Promise<AddCardResponse> => {
  const { data } = await axiosInstance.post<AddCardResponse>("/api/cards", request);
  return data;
};

export const deleteCard = async (cardId: number): Promise<DeleteCardResponse> => {
  const { data } = await axiosInstance.delete<DeleteCardResponse>(`/api/cards/${cardId}`);
  return data;
};

export const setDefaultCard = async (cardId: number): Promise<SetDefaultCardResponse> => {
  const { data } = await axiosInstance.put<SetDefaultCardResponse>(`/api/cards/${cardId}/default`);
  return data;
};
