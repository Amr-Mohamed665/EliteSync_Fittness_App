import { Clock, FileSpreadsheet, MapPin, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingSessions } from "@/lib/Api/Authentication/profile";
import axiosInstance from "@/lib/Axios/axiosInstance";
import type { Trainer } from "@/types/trainer";

// Helper to format 24h time string to 12h AM/PM
const formatTo12h = (timeStr: string) => {
  if (!timeStr || timeStr === "TBD") return timeStr;
  if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12.toString().padStart(2, "0")}:${(minutes || 0).toString().padStart(2, "0")} ${ampm}`;
};

type Session = {
  id: number | string;
  title: string;
  coach: string;
  img: string;
  date: string;
  time: string;
  location: string;
  trainerId?: string | number;
  trainer_id?: string | number;
  trainer?: {
    id: string | number;
  };
};

type DateInfo = {
  icon: LucideIcon;
  title: string;
};

// Function to fetch trainer profile data
const fetchTrainerProfile = async (trainerId: string | number): Promise<Trainer | null> => {
  try {
    const response = await axiosInstance.get(`/api/trainers/${trainerId}`);
    return response.data?.data || response.data || null;
  } catch (error) {
    console.error(`Failed to fetch trainer ${trainerId}:`, error);
    return null;
  }
};

// Normalize raw API data to the Session shape — handles all known field names
function normalizeSession(s: any): Session {
  if (!s || typeof s !== 'object') {
    return { id: Math.random(), title: "Invalid Session", coach: "Unknown", img: "", date: "TBD", time: "TBD", location: "TBD" };
  }
  
  // session_start is what the reschedule API expects/returns: "YYYY-MM-DD HH:mm:ss"
  const sessionStart = s.session_start ?? s.scheduled_at ?? s.booking_datetime ?? null;

  // Extract date
  const date =
    s.date ??
    s.session_date ??
    (sessionStart ? sessionStart.split(" ")[0] : undefined) ??
    s.booking_date ??
    "TBD";

  // Extract time
  const rawTime =
    s.time ??
    s.session_time ??
    (sessionStart ? sessionStart.split(" ")[1] : undefined) ??
    s.booking_time ??
    "TBD";

  return {
    id: s.id ?? s._id ?? s.booking_id,
    title:
      s.title ??
      s.sessionName ??
      s.session_name ??
      s.package?.title ??
      s.type ??
      "Training Session",
    coach:
      s.coach ??
      s.trainerName ??
      s.trainer_name ??
      s.trainer?.name ??
      s.trainer?.full_name ??
      "Professional Trainer",
    img: s.img ?? s.image ?? s.trainer?.image ?? s.trainer?.img ?? "",
    date,
    time: formatTo12h(rawTime),
    location: s.location ?? s.venue ?? s.trainer?.location ?? s.trainer?.address ?? s.trainer?.gym_location ?? "Coach Location",
  };
}

export default function UpcomingSessions() {
  const { data: sessions, isLoading } = useQuery<any>({
    queryKey: ["profile-upcoming-sessions"],
    queryFn: getUpcomingSessions,
  });

  // Handle different API response structures
  const rawArray = Array.isArray(sessions)
    ? sessions
    : sessions?.data ?? sessions?.sessions ?? sessions?.bookings ?? [];

  // Fetch trainer profiles for all sessions
  const trainerIds: (string | number)[] = [...new Set(rawArray
    .map((s: any) => s.trainerId ?? s.trainer_id ?? s.trainer?.id)
    .filter(Boolean) as (string | number)[]
  )];

  const { data: trainerProfiles } = useQuery({
    queryKey: ["trainer-profiles-profile", trainerIds],
    queryFn: async () => {
      const profiles = new Map();
      await Promise.all(
        trainerIds.map(async (id: string | number) => {
          const profile = await fetchTrainerProfile(id);
          if (profile) {
            profiles.set(id.toString(), profile);
          }
        })
      );
      return profiles;
    },
    enabled: trainerIds.length > 0,
  });

  // Update sessions with trainer locations
  const sessionsArray: Session[] = rawArray.map((session: any) => {
    const normalized = normalizeSession(session);
    const trainerId = session.trainerId ?? session.trainer_id ?? session.trainer?.id;
    
    if (trainerId && trainerProfiles?.has(trainerId.toString())) {
      const trainer = trainerProfiles.get(trainerId.toString());
      
      // Update location with trainer's actual location - check multiple possible fields
      const trainerLocation = trainer.location ?? trainer.address ?? trainer.venue ?? trainer.gym_location ?? 
                             trainer.gym ?? trainer.facility ?? trainer.location_name ?? trainer.works_at ?? 
                             trainer.branch ?? trainer.center ?? trainer.gym_name ?? trainer.location_address;
      
      if (trainerLocation) {
        // Replace "Online/Gym" with "Gym"
        normalized.location = trainerLocation === "Online/Gym" ? "Gym" : trainerLocation;
      }
    }
    
    return normalized;
  });

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h2 className="text-3xl font-semibold text-white mb-5">Upcoming Sessions</h2>
        <div className="animate-pulse border border-gray-600 p-4 rounded-2xl h-24 bg-[#2D2D2D]"></div>
      </div>
    );
  }

  if (!sessionsArray || sessionsArray.length === 0) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <h2 className="text-3xl font-semibold text-white mb-5">Upcoming Sessions</h2>
        <p className="text-gray-400">No upcoming sessions</p>
      </div>
    );
  }

  const getSessionDates = (session: Session): DateInfo[] => [
    { icon: FileSpreadsheet, title: session.date },
    { icon: Clock, title: session.time },
    { icon: MapPin, title: session.location },
  ];

  return (
    <div className="px-4 md:px-8 mt-10">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Upcoming Sessions</h2>
        <Link
          to="/profile/workout-history"
          className="text-orange text-base sm:text-lg font-bold underline cursor-pointer hover:text-orange/80 transition-colors duration-300 self-start"
        >
          View Past Sessions
        </Link>
      </div>
      {sessionsArray.map((session: Session) => {
        const dates = getSessionDates(session);
        return (
          <div
            key={session.id}
            className="flex flex-col border border-gray-600 bg-[#2D2D2D] p-4 rounded-2xl mb-4 gap-4 hover:border-gray-500 transition-colors duration-300"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={session.img || "/default-avatar.png"}
                  alt={session.coach}
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-normal text-lg sm:text-xl text-white truncate">{session.title}</p>
                  <p className="text-gray-400 text-sm truncate">with {session.coach}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2 sm:pl-16">
                {dates.map((date, index) => {
                  const Icon = date.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Icon size={14} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                      <p className="text-gray-400 text-xs sm:text-sm">{date.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <button className="flex-1 sm:flex-none border border-orange px-4 py-2.5 rounded-md text-xs font-bold text-orange hover:bg-orange hover:text-white transition-all duration-300 min-w-0">
                Reschedule
              </button>
              <button className="flex-1 sm:flex-none bg-orange px-4 py-2.5 rounded-md tracking-tight text-xs font-bold text-white hover:bg-orange/90 border border-orange transition-all duration-300 min-w-0">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}