import { Clock, FileSpreadsheet, MapPin, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingSessions } from "@/lib/Api/Authentication/profile";

type Session = {
  id: number;
  title: string;
  coach: string;
  img: string;
  date: string;
  time: string;
  location: string;
};

type DateInfo = {
  icon: LucideIcon;
  title: string;
};

export default function UpcomingSessions() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["profile-upcoming-sessions"],
    queryFn: getUpcomingSessions,
  });

  // Handle different API response structures
  const sessionsArray = Array.isArray(sessions) 
    ? sessions 
    : sessions?.data || sessions?.sessions || [];

  console.log("Sessions array:", sessionsArray);

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h2 className="text-3xl font-semibold mb-5">Upcoming Sessions</h2>
        <div className="animate-pulse border border-[#A7A7A7] p-4 rounded-2xl h-24 bg-muted"></div>
      </div>
    );
  }

  if (!sessionsArray || sessionsArray.length === 0) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h2 className="text-3xl font-semibold mb-5">Upcoming Sessions</h2>
        <p className="text-[#A7A7A7]">No upcoming sessions</p>
      </div>
    );
  }

  const getSessionDates = (session: Session): DateInfo[] => [
    { icon: FileSpreadsheet, title: session.date || "TBD" },
    { icon: Clock, title: session.time || "TBD" },
    { icon: MapPin, title: session.location || "TBD" },
  ];

  return (
    <div className="px-4 md:px-8 mt-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-3">
        <h2 className="text-3xl font-semibold mb-5">Upcoming Sessions</h2>
        <Link
          to="/profile/workout-history"
          className="text-[#FF4D4D] text-lg sm:text-2xl font-bold underline cursor-pointer hover:text-red-600 transition"
        >
          View Past Sessions
        </Link>
      </div>
      {sessionsArray?.map((session: Session) => {
        const dates = getSessionDates(session);
        return (
          <div
            key={session.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-[#A7A7A7] p-4 rounded-2xl mb-4 gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={session.img || "/default-avatar.png"}
                  alt={session.coach}
                  className="w-13 h-13 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-normal text-xl text-[#FFFFFF]">{session.title}</p>
                  <p className="text-[#A7A7A7] text-sm">with {session.coach}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 pl-16">
                {dates.map((date, index) => {
                  const Icon = date.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Icon size={16} className="w-5 h-5 text-[#A7A7A7] shrink-0" />
                      <p className="text-[#A7A7A7] text-sm">{date.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button className="border border-[#FF4D4D] px-5 py-2.5 rounded-md text-xs font-bold hover:bg-[#FF4D4D] transition">
                Reschedule
              </button>
              <button className="bg-[#FF4D4D] px-5 py-2.5 rounded-md tracking-tight text-xs font-bold hover:bg-black border border-[#FF4D4D] transition">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}