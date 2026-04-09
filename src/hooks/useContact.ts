import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { toast } from "react-hot-toast";
type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const useContact = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: ContactData) => {
      // Postman: POST /api/landing/contact
      // Payload: sender_id, subject, body, status
      const payload = {
        subject: data.subject,
        body: data.message, // mapped from message
        status: "pending",
        // Additional fields needed by backend?
        name: data.name,
        email: data.email
      };
      const response = await axiosInstance.post("/api/landing/contact", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export default useContact;
