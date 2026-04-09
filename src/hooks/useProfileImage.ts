import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage, removeProfileImage } from "@/lib/Api/Authentication/profile";
import { toast } from "react-hot-toast";

export const useProfileImage = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      console.log("Upload response:", data);
      toast.success("Profile image uploaded successfully");
      const imageUrl = data.image_url || data.profile_image || data.url || data;
      // Update both cache entries immediately with new image URL
      queryClient.setQueryData(["profile-Overview"], (oldData: any) => ({
        ...oldData,
        profile_image: imageUrl,
      }));
      queryClient.setQueryData(["profile"], (oldData: any) => ({
        ...oldData,
        profile_image: imageUrl,
      }));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-Overview"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Failed to upload image",
      );
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeProfileImage,
    onSuccess: () => {
      toast.success("Profile image removed successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-Overview"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Failed to remove image",
      );
    },
  });

  return {
    uploadImage: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    removeImage: removeMutation.mutate,
    isRemoving: removeMutation.isPending,
  };
};

export default useProfileImage;
