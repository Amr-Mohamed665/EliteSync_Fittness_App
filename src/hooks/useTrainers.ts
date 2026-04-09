import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios/axiosInstance";
import type { Trainer } from "@/types/trainer";

const useTrainers = (searchValue?: string) => {
  const {
    data: trainers,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["landing-trainers", searchValue],
    queryFn: async () => {
      const endpoint = searchValue 
        ? `/api/search?search_value=${encodeURIComponent(searchValue)}`
        : "/api/trainers";
        
      const response = await axiosInstance.get<{ data: Trainer[] } | Trainer[]>(
        endpoint
      );

      // Handle both flat array and { data: [...] } structure
      const rawData =
        (response.data as { data: Trainer[] }).data || response.data;

      if (!Array.isArray(rawData)) {
        console.error("Unexpected API response format:", response.data);
        return [];
      }

      console.log("Trainers API response:", rawData);
      console.log("First trainer price_per_session:", rawData[0]?.price_per_session);

      return rawData as Trainer[];
    },
  });

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    trainers: Array.isArray(trainers) ? trainers : [],
    loading,
    error: errorMessage,
  };
};

export default useTrainers;
