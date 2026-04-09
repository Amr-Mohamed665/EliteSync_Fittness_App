import React, { useState, useRef } from "react";
import { Goal, Dumbbell, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProfileOverview } from "@/lib/Api/Authentication/profile";
import { useProfileImage } from "@/hooks/useProfileImage";
type InfoCard = {
  title: string;
  value: string;
  icon: LucideIcon;
};

const ProfileOverview: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, removeImage, isUploading, isRemoving } = useProfileImage();
  const [about] = useState(
    "Fitness enthusiast focused on strength training and overall wellness. Training consistently for 2 years. Looking to push my limits and achieve new personal records in deadlifts and squats while maintaining a balanced lifestyle.",
  );

  const [cards] = useState<InfoCard[]>([
    {
      title: "Fitness Goal",
      value: "Build Muscle",
      icon: Goal,
    },
    {
      title: "Preferred Training",
      value: "Both (Online & Gym)",
      icon: Dumbbell,
    },
  ]);
  const { data } = useQuery({
    queryKey: ["profile-Overview"],
    queryFn: getProfileOverview,
  });

  // Debug: log the data to see what the API returns
  console.log("Profile data:", data);
  console.log("Profile image:", data?.profile_image);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = () => {
    removeImage();
  };

  return (
    <div className=" text-white px-4 md:px-8 ">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Profile Overview
      </h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img
          src={data?.profile_image || "/default-avatar.png"}
          alt="Profile"
          className="w-32 md:w-40 rounded-full object-cover"
        />
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-2">
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="bg-[#FF4D4D] px-6 py-2.5 rounded-md tracking-tight text-xs font-bold hover:bg-black border border-[#FF4D4D] transition disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload New"}
          </button>
          <button
            onClick={handleRemoveClick}
            disabled={isRemoving}
            className="border border-[#FF4D4D] px-6 py-2.5 rounded-md text-xs font-bold hover:bg-[#FF4D4D] transition disabled:opacity-50"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
          </div>
          <p className="text-[#A7A7A7] text-xs">
            JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
      </div>
      <div className="mb-6 border-b border-[#A7A7A7] pb-10 ">
        <h3 className="mb-2 font-semibold text-2xl">
          About Me
        </h3>
        <p className="text-[#A7A7A7] text-base sm:text-xl leading-6 w-full md:w-4/5">
          {about}
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 border-b pb-8 border-border/50">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col border-l border-[#FF4D4D] rounded-lg px-4 py-8 sm:py-12 text-center justify-center ">
            <div className="flex items-center justify-center mb-2 ">
              <card.icon size={20} className="mr-1" />
              <p className="text-[#FFFFFF] text-2xl">
                {card.title}
              </p>
            </div>
            <p className="mt-2 font-light text-[#FFFFFF] text-lg border-0 bg-[#5F97F60D] rounded-md py-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div >

  );
};

export default ProfileOverview;
