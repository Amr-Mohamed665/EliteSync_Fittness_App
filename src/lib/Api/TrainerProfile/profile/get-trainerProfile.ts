import axiosInstance from "@/lib/Axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getTrainer(id: number) {
  const res = await axiosInstance.get(`/api/trainers/${id}`);
  return res.data;
}

export function useGetTrainer(id: number) {
  return useQuery({
    queryKey: [`trainer-${id}`],
    queryFn: () => getTrainer(id),
  });
}
