import axiosInstance from "@/lib/Axios/axiosInstance";

export interface Trainer {
  id: number;
  name: string;
  email: string;
  specialization: string;
  experience_years: number;
  rating: number;
  profile_image?: string;
  bio?: string;
}

export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  day_of_week: string;
  is_available: boolean;
}

export interface TrainerScheduleResponse {
  status: boolean;
  message: string;
  data: TimeSlot[];
}

export interface TrainersResponse {
  status: boolean;
  message: string;
  data: Trainer[];
}

export const getTrainers = async (): Promise<TrainersResponse> => {
  const { data } = await axiosInstance.get<TrainersResponse>("/api/trainers");
  return data;
};

export const getTrainer = async (trainerId: number): Promise<{ status: boolean; message: string; data: Trainer }> => {
  const { data } = await axiosInstance.get(`/api/trainers/${trainerId}`);
  return data;
};

export const getTrainerSchedule = async (trainerId: number): Promise<TrainerScheduleResponse> => {
  const { data } = await axiosInstance.get<TrainerScheduleResponse>(`/api/trainers/${trainerId}/schedule`);
  return data;
};

export const getTrainerAvailability = async (trainerId: number, date?: string): Promise<TrainerScheduleResponse> => {
  const { data } = await axiosInstance.get<TrainerScheduleResponse>(`/api/trainers/${trainerId}/availability`, {
    data: date ? { date } : undefined
  });
  return data;
};
