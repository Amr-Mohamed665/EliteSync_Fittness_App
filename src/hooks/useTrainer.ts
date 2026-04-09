import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios/axiosInstance";
import type { Trainer } from "@/types/trainer";

const useTrainer = (id: string | number | undefined) => {
  const {
    data: trainer,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      if (!id) return null;
      // Fetch all trainers and find the one with the matching ID
      const response = await axiosInstance.get<{ data: Trainer[] } | Trainer[]>(
        "api/trainers"
      );

      // Handle both flat array and { data: [...] } structure
      const rawData =
        (response.data as { data: Trainer[] }).data || response.data;

      if (!Array.isArray(rawData)) {
        console.error("Unexpected API response format:", response.data);
        return null;
      }

      const trainerMatch = rawData.find((t) => t.id.toString() === id.toString());
      return trainerMatch || null;
    },
    enabled: !!id,
  });

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    trainer,
    loading,
    error: errorMessage,
  };
};

export default useTrainer;
