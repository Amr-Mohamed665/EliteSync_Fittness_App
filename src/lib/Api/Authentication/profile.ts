import axiosInstance from "@/lib/Axios/axiosInstance";

export interface PaymentMethod {
  id: number;
  card_type: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  card_holder_name?: string;
  is_default?: boolean;
}

export const getProfile = async () => {
  const res = await axiosInstance.get("/api/profile");
  return res.data;
};

export const updateProfile = async (data: Record<string, any>) => {
  const res = await axiosInstance.put("/api/profile", data);
  return res.data;
};

export const getProfileHeader = async () => {
  const res = await axiosInstance.get("/api/profile");
  return res.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axiosInstance.post("/api/profile/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const removeProfileImage = async () => {
  const res = await axiosInstance.delete("/api/landing/removeImage");
  return res.data;
};

export const getProfileOverview = async () => {
  const res = await axiosInstance.get("/api/profile");
  return res.data;
};

export const getPersonalInfor = async () => {
  const res = await axiosInstance.get("/api/profile/fitness-profile");
  return res.data;
};

export const getUpcomingSessions = async () => {
  const res = await axiosInstance.get("/api/profile/sessions");
  return res.data;
};

export const getMyPackage = async () => {
  const res = await axiosInstance.get("/api/profile/packages");
  return res.data;
};

export const getProgressActivity = async () => {
  const res = await axiosInstance.get("/api/profile/progress-activity");
  return res.data;
};

export const getBillingPage = async () => {
  const res = await axiosInstance.get("/api/profile/payment-methods");
  return res.data;
};

export const addPaymentMethod = async (data: Record<string, any>) => {
  const res = await axiosInstance.post("/api/profile/payment-methods", data);
  return res.data;
};

export const deletePaymentMethod = async (cardId: number) => {
  const res = await axiosInstance.delete(`/api/profile/payment-methods/${cardId}`);
  return res.data;
};

export const getWorkoutHistory = async () => {
  const res = await axiosInstance.get("/api/profile/workout-history");
  return res.data;
};

export const getChangePassword = async () => {
  const res = await axiosInstance.get("/api/profile");
  return res.data;
};

export const getTrainerSchedule = async (trainerId: string | number) => {
  const res = await axiosInstance.get(`/api/trainers/${trainerId}/schedule`);
  return res.data;
};

export const createBooking = async (data: {
  trainer_id?: string | number;
  trainer_package_id?: string | number;
  date?: string;
  time?: string;
  sessions?: Array<{ session_start: string }>;
  [key: string]: any;
}) => {
  // Postman: POST /api/bookings/schedule
  // Body: { trainer_package_id, sessions: [ { session_start: "2026-04-03 10:00:00" } ] }
  
  let payload = data;
  
  // If we have single date/time, convert to the format backend expects
  if (data.date && data.time && !data.sessions) {
    payload = {
      trainer_package_id: data.trainer_package_id || data.trainer_id,
      sessions: [
        {
          session_start: `${data.date} ${data.time}:00`
        }
      ]
    };
  }

  const res = await axiosInstance.post("/api/bookings/schedule", payload);
  return res.data;
};