import ProfileHeader from "@/pages/Profile/ProfileHeader";
import ProfileOverview from "@/pages/Profile/ProfileOverview";
import PersonalInfor from "@/pages/Profile/PersonalInfor";
import UpcomingSessions from "@/pages/Profile/UpcomingSessions";
import MyPackage from "@/pages/Profile/MyPackage";
import ProgressActivity from "@/pages/Profile/ProgressActivity";
import BillingPage from "@/pages/Profile/BillingPage";
import ChangePassword from "./ChangePassword";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";

function UserProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  return (
    <div className="bg-linear-to-b from-[#FF4D4DCC]/15 via-[#FF4D4D]/0.5 to-[#838383]/0.5 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen ">
      {data && <ProfileHeader />}
      {data && <ProfileOverview />}
      {data && <PersonalInfor />}
      {data && <UpcomingSessions />}
      {data && <MyPackage />}
      {data && <ProgressActivity />}
      {data && <BillingPage />}
      {data && <ChangePassword />}

    </div>
  )
}

export default UserProfile;