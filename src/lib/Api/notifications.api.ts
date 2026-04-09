import axiosInstance from "@/lib/Axios/axiosInstance";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse {
  status: boolean;
  message: string;
  data: Notification[];
  total?: number;
  unread_count?: number;
}

export interface MarkAsReadResponse {
  status: boolean;
  message: string;
}

export const getNotifications = async (): Promise<NotificationResponse> => {
  const { data } = await axiosInstance.get<NotificationResponse>("/api/notifications");
  return data;
};

export const markAsRead = async (notificationId: number): Promise<MarkAsReadResponse> => {
  const { data } = await axiosInstance.patch<MarkAsReadResponse>(`/api/notifications/${notificationId}/mark-read`);
  return data;
};

export const markAllAsRead = async (): Promise<MarkAsReadResponse> => {
  // Postman shows PATCH /api/notifications/1/mark-all-read
  const { data } = await axiosInstance.patch<MarkAsReadResponse>("/api/notifications/1/mark-all-read");
  return data;
};

export const deleteNotification = async (notificationId: number): Promise<MarkAsReadResponse> => {
  // Postman shows DELETE /api/notifications/1/delete
  const { data } = await axiosInstance.delete<MarkAsReadResponse>(`/api/notifications/${notificationId}/delete`);
  return data;
};
