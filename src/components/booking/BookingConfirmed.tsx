import { Link } from "react-router-dom";
import BookingInfoList from "./BookingInfoList";
import SuccessfullySignedIcon from "./SuccessfullySignedIcon";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";

export type BookingDetails = {
  trainerName?: string;
  packageTitle?: string;
  date?: string;
  time?: string;
  booking_id?: string | number;
  [key: string]: any;
};

const BookingConfirmed = ({ details }: { details?: BookingDetails }) => {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const userName = isLoading ? "Loading..." : (profileData?.name || "User");

  return (
    <div className=" max-w-4xl mx-auto  bg-[#2D2D2D] rounded-2xl py-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-4 px-4">
        <SuccessfullySignedIcon className="mb-4" />
        <h2 className="self-center text-2xl font-bold">Booking Confirmed</h2>
        <p className="max-w-lg text-center text-xl font-light text-gray-300 text-wrap self-center">
          You're All set, {userName}. Check your Email ({profileData?.email || ""}) For confirmation Details
          Preparation Instructions.
        </p>
        <h3 className="self-center text-xl font-bold">Booking Summary</h3>
        <div className="w-full rounded border border-[#999999] bg-gray-950 p-2">
          <BookingInfoList details={details || {}} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 rounded border border-orange py-2 text-orange cursor-pointer hover:bg-orange/10 transition-colors duration-300 text-center font-bold"
          >
            Back To Home
          </Link>
          <Link
            to="/profile/billing"
            className="flex-1 rounded bg-orange py-2 text-white cursor-pointer hover:scale-102 transition-scale duration-300 text-center font-bold"
          >
            View Billing History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
