import axiosInstance from "@/lib/Axios/axiosInstance";

interface FitnessProfile {
  gender: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  fitness_goal: string;
  fitness_level: string;
  workout_location: string;
  preferred_training_days: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  profile_image?: string;
  status: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  fitness_profile?: FitnessProfile;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const { data } = await axiosInstance.get<ProfileResponse>("/api/profile");
  return data;
};

export const saveFitnessProfile = async (
  payload: FitnessProfile,
): Promise<void> => {
  await axiosInstance.post("/api/profile/fitness-profile", payload);
};
