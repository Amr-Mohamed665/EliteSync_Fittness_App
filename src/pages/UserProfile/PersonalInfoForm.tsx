import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useState, useEffect } from "react";

interface ProfileData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  location?: string;
  profile_image?: string;
}

export default function PersonalInfoForm() {
  const { data: profile, isLoading } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { updateProfile, isUpdating } = useUpdateProfile();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    location: "",
  });

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        date_of_birth: profile.date_of_birth || "",
        gender: profile.gender || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Personal Information</h2>
        <div className="animate-pulse border border-[#a1a1a1] rounded-xl h-64"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10">
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Personal Information
      </h2>

      <div className="border border-[#a1a1a1] rounded-xl p-4 sm:p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Full Name
            </label>
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Date of Birth
            </label>
            <Input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Gender
            </label>
            <Input
              placeholder="Gender"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Location
            </label>
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full sm:w-[588px] mx-auto h-12 text-sm font-semibold text-white bg-primary border border-primary rounded-sm hover:bg-primary/80 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
