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

const getMockProfileCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )mock_profile=([^;]+)'));
  if (match) {
    try { return JSON.parse(decodeURIComponent(match[2])); } catch {}
  }
  return {};
};

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get("/api/profile");
    return { ...res.data, ...getMockProfileCookie() };
  } catch (e) {
    return getMockProfileCookie();
  }
};

export const updateProfile = async (data: Record<string, any>) => {
  const updated = { ...getMockProfileCookie(), ...data };
  document.cookie = `mock_profile=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=${7 * 24 * 60 * 60}`;
  
  try {
    const res = await axiosInstance.put("/api/profile", data);
    return { ...res.data, ...updated };
  } catch (e) {
    return updated;
  }
};

export const getProfileHeader = async () => {
  return getProfile();
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
  const res = await axiosInstance.post("/api/profile/remove-image");
  return res.data;
};

export const getProfileOverview = async () => {
  return getProfile();
};

export const getPersonalInfor = async () => {
  const res = await axiosInstance.get("/api/profile/fitness-profile");
  return res.data;
};

export const getUpcomingSessions = async (): Promise<any[]> => {
  let apiSessions: any[] = [];
  try {
    const res = await axiosInstance.get("/api/profile/sessions");
    apiSessions = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.sessions || []);
  } catch (e) {
    console.error("Failed to fetch sessions from API, falling back to mock", e);
  }

  let mockSessions: any[] = [];
  const match = document.cookie.match(new RegExp('(^| )mock_sessions=([^;]+)'));
  if (match) {
    try {
      mockSessions = JSON.parse(decodeURIComponent(match[2]));
    } catch {}
  }

  return [...mockSessions, ...apiSessions];
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
  trainer_id: string | number;
  date: string;
  time: string;
  [key: string]: any;
}) => {
  const res = await axiosInstance.post("/api/bookings/schedule", data);
  return res.data;
};