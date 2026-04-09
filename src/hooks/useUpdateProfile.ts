import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/lib/Api/Authentication/profile";
import { toast } from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      // Invalidate profile queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-Overview"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Failed to update profile",
      );
    },
  });

  return {
    updateProfile: mutate,
    isUpdating: isPending,
  };
};

export default useUpdateProfile;
