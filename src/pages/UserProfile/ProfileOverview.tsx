import InfoTagCard from "../../components/common/UserProfile/InfoTagCard";
import { BowArrow, Dumbbell, AlertTriangle } from "lucide-react";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "@/components/common/UserProfile/ProfileHeader";
import userAvatar from "@/assets/user2.jpg";
import { useProfileImage } from "@/hooks/useProfileImage";
import { getProfile } from "@/lib/Api/Authentication/profile";
import { deleteAccount } from "@/lib/Api/Authentication/Authentication";
import useUserPackage from "@/hooks/useUserPackage";

interface ProfileData {
  id?: number;
  name?: string;
  email?: string;
  profile_image?: string;
  member_since?: number;
  sessions_completed?: number;
  active_package?: string;
  next_session?: string;
  about_me?: string;
  fitness_goal?: string;
  preferred_training?: string;
}

export default function ProfileOverview() {
  const uploadInp = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useProfileImage();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { data: profileData, isLoading } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  
  const { profileOverviewPackageName, isLoading: packageLoading } = useUserPackage();

  const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(file);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result.status) {
        // Redirect to login or home page after successful deletion
        window.location.href = '/login';
      } else {
        alert(result.message || 'Failed to delete account');
      }
    } catch (error) {
      alert('An error occurred while deleting your account');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="animate-pulse rounded-2xl border border-border bg-card h-40"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-foreground">Profile Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <ProfileHeader
        name={profileData?.name || "User"}
        member={profileData?.member_since || new Date().getFullYear()}
        sessionComplete={profileData?.sessions_completed || 0}
        activePackage={packageLoading ? "Loading..." : (profileOverviewPackageName || "Premium")}
        nextSession={profileData?.next_session || "N/A"}
        avatarUrl={profileData?.profile_image || userAvatar}
        onAvatarClick={() => !isUploading && uploadInp.current?.click()}
      />

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/jpeg,image/gif,image/png"
        hidden
        ref={uploadInp}
        onChange={changePhoto}
      />

      {/* About Me */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground mb-3">
          About Me
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {profileData?.about_me || "No about me information yet."}
        </p>
      </div>

      {/* Info Tags */}
      <div className="flex flex-col sm:flex-row gap-4">
        <InfoTagCard
          icon={<BowArrow size={18} />}
          label="Fitness Goal"
          value={profileData?.fitness_goal || "Not set"}
        />
        <InfoTagCard
          icon={<Dumbbell size={18} />}
          label="Preferred Training"
          value={profileData?.preferred_training || "Not set"}
        />
      </div>

      {/* Delete Account Section */}
      <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-red-900/10 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Danger Zone
          </h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-red-200 leading-relaxed">
            ⚠️ Once you delete your account, there is no going back. Please be certain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={() => setShowDeleteDialog(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm text-foreground">
                Are you sure you want to delete your account? This will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Your profile information</li>
                <li>Booking history</li>
                <li>Payment methods</li>
                <li>All account data</li>
              </ul>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
