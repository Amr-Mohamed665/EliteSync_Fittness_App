import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { countries } from "@/components/lib/constants/Countries";

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

  const [phoneError, setPhoneError] = useState("");

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        date_of_birth: profile.date_of_birth || "",
        gender: profile.gender?.toLowerCase() || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      // Only allow numbers
      const cleaned = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [field]: cleaned }));
      
      // Clear error if user starts typing a valid length
      if (cleaned.length >= 10) {
        setPhoneError("");
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.phone && formData.phone.length < 10) {
      setPhoneError("Phone number must be at least 10 digits.");
      toast.error("Please fix the errors before saving.");
      return;
    }
    setPhoneError("");
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
              className="!bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]"
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
              disabled
              className="!bg-[#2d2d2d] border-[#3A3A3A] h-11 text-[#a1a1a1] cursor-not-allowed opacity-70"
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
              className={cn(
                "!bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white placeholder:text-[#a1a1a1]",
                phoneError && "border-red-500 focus-visible:ring-red-500/50"
              )}
            />
            {phoneError && (
              <p className="text-red-500 text-[10px] font-medium mt-0.5 ml-1 animate-in fade-in slide-in-from-top-1">
                {phoneError}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Date of Birth
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex bg-[#2d2d2d] border border-[#3A3A3A] h-11 w-full rounded-md px-3 py-1 text-sm text-white items-center justify-between cursor-pointer focus:outline-none transition-all duration-200",
                    !formData.date_of_birth && "text-[#a1a1a1]"
                  )}
                >
                  {formData.date_of_birth 
                    ? format(parseISO(formData.date_of_birth), "PPP") 
                    : "Pick a date"}
                  <CalendarIcon className="h-4 w-4 text-[#a1a1a1]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-950 border-gray-600">
                <style>{`
                  [data-radix-popover-content] select {
                    color: #ef4444 !important;
                    font-weight: bold !important;
                  }
                  [data-radix-popover-content] select option {
                    color: white !important;
                  }
                  [data-radix-popover-content] select option:checked,
                  [data-radix-popover-content] select option[selected] {
                    color: #ef4444 !important;
                    background-color: #fef2f2 !important;
                  }
                  div.rdp-caption select,
                  .rdp-caption > div > select,
                  .rdp-dropdown select,
                  select[rdp] {
                    color: #ef4444 !important;
                    font-weight: bold !important;
                    background-color: #1f2937 !important;
                    border-color: #4b5563 !important;
                  }
                  div.rdp-caption select option,
                  .rdp-caption > div > select option,
                  .rdp-dropdown select option,
                  select[rdp] option {
                    color: white !important;
                    background-color: #1f2937 !important;
                  }
                  div.rdp-caption select option:checked,
                  .rdp-caption > div > select option:checked,
                  .rdp-dropdown select option:checked,
                  select[rdp] option:checked {
                    color: #ef4444 !important;
                    background-color: #fef2f2 !important;
                  }
                  div.rdp-caption select option[selected],
                  .rdp-caption > div > select option[selected],
                  .rdp-dropdown select option[selected],
                  select[rdp] option[selected] {
                    color: #ef4444 !important;
                    background-color: #fef2f2 !important;
                  }
                `}</style>
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={formData.date_of_birth ? parseISO(formData.date_of_birth) : undefined}
                  onSelect={(date) => 
                    handleChange("date_of_birth", date ? format(date, "yyyy-MM-dd") : "")
                  }
                  fromYear={1940}
                  toYear={new Date().getFullYear()}
                  className="text-white [&_.rdp-head_cell]:text-white [&_.rdp-cell]:text-white [&_.rdp-day]:text-white [&_.rdp-day:hover]:bg-primary/20 [&_.rdp-day:focus]:bg-primary/30 [&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected:text-white] [&_.rdp-caption_label]:text-white [&_.rdp-dropdown]:text-white [&_.rdp-dropdown]:bg-gray-800 [&_.rdp-dropdown]:border-gray-600 [&_.rdp-dropdown_option]:text-white [&_.rdp-dropdown_option:hover]:bg-primary/20] [&_.rdp-dropdown_option_selected]:text-red-500 [&_.rdp-dropdown_option_selected]:bg-red-500/10] [&_select]:text-red-500 [&_select_option]:text-white [&_select_option[selected]]:text-red-500 [&_select_option[selected]]:bg-red-500/10] select:text-red-500 select:font-bold"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white px-3 rounded-md border w-full focus:outline-none transition-all duration-200 cursor-pointer appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1a1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="">Select Gender</option>
              <option value="male" className="bg-[#2d2d2d]">Male</option>
              <option value="female" className="bg-[#2d2d2d]">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-md font-semibold text-[#a1a1a1]">
              Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="bg-[#2d2d2d] border-[#3A3A3A] h-11 text-white px-3 rounded-md border w-full focus:outline-none transition-all duration-200 cursor-pointer appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1a1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country} className="bg-[#2d2d2d]">
                  {country}
                </option>
              ))}
            </select>
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
