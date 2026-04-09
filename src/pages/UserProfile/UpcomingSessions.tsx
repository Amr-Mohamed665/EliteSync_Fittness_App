import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SessionCard from "../../components/common/UserProfile/SessionCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, NotepadText } from "lucide-react";
import { getUpcomingSessions } from "@/lib/Api/Authentication/profile";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { Calendar } from "@/components/ui/calendar";
import { timeSlots } from "@/components/lib/constants/Trainer/TrainerData";
import useTrainerSchedule from "@/hooks/useTrainerSchedule";

// Helper to format time to 12h
const formatTo12h = (timeStr: string) => {
  if (!timeStr || timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${h12.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')} ${ampm}`;
};

interface Session {
  id: string | number;
  sessionName: string;
  trainerName: string;
  trainerId?: string | number;
  date: string;
  time: string;
  location: string;
  status?: string;
}

interface UpcomingSessionsProps {
  sessions?: Session[];
  onReschedule?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const QUERY_KEY = "profile-upcoming-sessions";

function normalizeSession(s: any): Session {
  return {
    id: s.id ?? s._id ?? s.booking_id,
    sessionName: s.sessionName ?? s.session_name ?? s.package?.title ?? s.type ?? "Training Session",
    trainerName: s.trainerName ?? s.trainer_name ?? s.trainer?.name ?? s.trainer?.full_name ?? "Professional Trainer",
    // No hardcoded fallback — undefined is safer than wrong ID
    trainerId: s.trainerId ?? s.trainer_id ?? s.trainer?.id ?? undefined,
    date: s.date ?? (s.scheduled_at ? s.scheduled_at.split(' ')[0] : s.booking_date ?? "TBD"),
    time: s.time ?? (s.scheduled_at ? s.scheduled_at.split(' ')[1] : s.booking_time ?? "TBD"),
    location: s.location ?? s.venue ?? "Online/Gym",
    status: s.status ?? "confirmed",
  };
}

export default function UpcomingSessions({
  sessions: propSessions,
  onReschedule,
  onViewDetails,
}: UpcomingSessionsProps) {
  const queryClient = useQueryClient();

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const { isLoading: isLoadingSchedule, getAvailableTimesForDate } = useTrainerSchedule(selectedSession?.trainerId);
  const apiAvailableTimes = getAvailableTimesForDate(newDate);
  const availableTimes = apiAvailableTimes.length > 0 ? apiAvailableTimes : timeSlots;

  const { data: apiSessions, isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getUpcomingSessions,
    // Always fetch from API; prop sessions are just a render-time override
    enabled: !propSessions?.length,
  });

  const rawSessions = propSessions?.length
    ? propSessions
    : Array.isArray(apiSessions)
    ? apiSessions
    : apiSessions?.data ?? apiSessions?.sessions ?? apiSessions?.bookings ?? [];

  const sessionsArray: Session[] = rawSessions.map(normalizeSession);

  // ── Refresh the list without a full page reload ──
  const refreshSessions = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Upcoming Sessions</h2>
          <div className="animate-pulse h-6 w-32 bg-muted rounded"></div>
        </div>
        <div className="animate-pulse h-24 bg-muted rounded-xl"></div>
      </div>
    );
  }

  if (!sessionsArray.length) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Upcoming Sessions</h2>
          <Link
            to="/sessions/past"
            className="text-sm sm:text-2xl font-semibold underline text-primary hover:text-primary/80 transition-colors duration-200 shrink-0">
            View Past Sessions
          </Link>
        </div>
        <p className="text-muted-foreground">No upcoming sessions</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">Upcoming Sessions</h2>
        <Link
          to="/sessions/past"
          className="text-sm sm:text-2xl font-semibold underline text-primary hover:text-primary/80 transition-colors duration-200 shrink-0">
          View Past Sessions
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:mt-4">
        {sessionsArray.map((session) => (
          <SessionCard
            key={session.id}
            sessionName={session.sessionName}
            trainerName={session.trainerName}
            date={session.date}
            time={session.time}
            location={session.location}
            onReschedule={() => {
              if (onReschedule) {
                onReschedule(session.id.toString());
              } else {
                setSelectedSession(session);
                setNewDate(undefined);
                setNewTime("");
                setIsRescheduleOpen(true);
              }
            }}
            onViewDetails={() => {
              if (onViewDetails) {
                onViewDetails(session.id.toString());
              } else {
                setSelectedSession(session);
                setIsDetailsOpen(true);
              }
            }}
            onCancel={() => {
              setSelectedSession(session);
              setIsCancelOpen(true);
            }}
          />
        ))}
      </div>

      {/* ── View Details Dialog ── */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-gray-950 border-gray-600 text-white sm:max-w-2xl p-4">
          <DialogHeader className="pb-1 border-b border-gray-800">
            <DialogTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <NotepadText className="text-primary" size={18} />
                <span>Booking Details</span>
              </div>
              <span className="text-[10px] text-[#a1a1a1] font-mono">
                #{selectedSession?.id.toString().slice(-6).toUpperCase()}
              </span>
            </DialogTitle>
            <div className="sr-only">
              <DialogDescription>Detailed information about your upcoming training session.</DialogDescription>
            </div>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4 py-1 pr-1">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                  <p className="text-[10px] text-primary font-bold uppercase mb-1">Session Type</p>
                  <p className="text-sm font-bold truncate">{selectedSession.sessionName}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                  <p className="text-[10px] text-primary font-bold uppercase mb-1">Assigned Coach</p>
                  <p className="text-sm font-bold truncate capitalize">{selectedSession.trainerName}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/50 border border-dashed border-gray-800 flex flex-col justify-center items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Status</span>
                  <span className="text-xs text-green-500 font-bold uppercase">
                    {selectedSession.status ?? "Confirmed"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#1A1A1A] border border-gray-800">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase">Date</span>
                  </div>
                  <p className="text-xs font-semibold">{selectedSession.date}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1A1A] border border-gray-800">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase">Time</span>
                  </div>
                  <p className="text-xs font-semibold">{formatTo12h(selectedSession.time)}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1A1A] border border-gray-800">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase">Location</span>
                  </div>
                  <p className="text-xs font-semibold truncate">{selectedSession.location}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-950 border border-gray-800">
                  <h4 className="text-[10px] text-primary font-bold uppercase mb-1">Quick Note</h4>
                  <p className="text-xs text-gray-400 leading-tight">Bring water &amp; towel.</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-2 pt-1 border-t border-gray-800">
            <Button
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white text-sm font-bold"
              onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reschedule Dialog ── */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent className="bg-gray-950 border-gray-600 text-white sm:max-w-4xl p-4">
          <DialogHeader className="pb-2 border-b border-gray-800">
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                <span>Reschedule Session</span>
              </div>
              {selectedSession && (
                <div className="flex items-center gap-4 bg-red-600/15 px-5 py-2 rounded-full border border-red-600/40 mr-10 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                  <span className="text-sm text-red-500 font-black uppercase tracking-widest">Current:</span>
                  <span className="text-lg text-white font-black">
                    {selectedSession.date} at {formatTo12h(selectedSession.time)}
                  </span>
                </div>
              )}
            </DialogTitle>
            <div className="sr-only">
              <DialogDescription>Select a new date and time for your training session.</DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-6 py-4">
            <div className="flex-1 bg-[#1A1A1A] p-2 rounded-xl border border-gray-800">
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="w-full text-white scale-90 origin-top"
                classNames={{
                  selected: "bg-red-600 text-white rounded-md",
                  today: "bg-gray-800 text-white",
                }}
              />
            </div>

            <div className="flex-1 space-y-4">
              <h4 className="text-sm font-black uppercase tracking-[0.15em] text-white border-b border-gray-700 pb-2 flex items-center gap-2">
                <span className="w-1 h-3 bg-red-600 rounded-full" />
                {isLoadingSchedule ? "Checking Availability..." : "Select New Time"}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {!newDate ? (
                  <div className="col-span-3 text-center py-12 bg-gray-900/30 rounded-lg border border-dashed border-gray-800">
                    <p className="text-lg text-gray-500 font-medium italic">Please select a date first</p>
                  </div>
                ) : availableTimes.length === 0 ? (
                  <div className="col-span-3 text-center py-8 bg-gray-900/50 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">No slots available for this date</p>
                    <p className="text-[10px] text-gray-600 mt-1">Try another day or contact coach</p>
                  </div>
                ) : (
                  availableTimes.map((t) => (
                    <Button
                      key={t}
                      variant={newTime === t ? "default" : "outline"}
                      className={`h-12 text-sm font-bold transition-all duration-200 ${
                        newTime === t
                          ? "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_12px_rgba(220,38,38,0.4)] scale-105"
                          : "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => setNewTime(t)}>
                      {formatTo12h(t)}
                    </Button>
                  ))
                )}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-red-600/5 border border-red-600/10 flex flex-col gap-4">
                <div>
                  <p className="text-xs text-red-500 uppercase font-black tracking-[0.2em] mb-3 text-center">Final Selection</p>
                  <div className="flex items-center justify-center gap-6 text-4xl font-black italic tracking-tighter">
                    <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      {newDate ? newDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "---"}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,1)] shrink-0" />
                    <span className="text-red-600 uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                      {newTime ? formatTo12h(newTime) : "---"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-transparent border-gray-700 text-white hover:bg-red-600 hover:text-white hover:border-red-600 text-sm font-bold min-w-[140px] transition-all duration-300"
                    onClick={() => setIsRescheduleOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="h-12 px-8 bg-primary hover:bg-red-700 text-white text-sm font-bold min-w-[140px] border border-red-500 shadow-sm hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300"
                    disabled={!newDate || !newTime || isRescheduling}
                    onClick={async () => {
                      if (!selectedSession || !newDate || !newTime) return;
                      setIsRescheduling(true);
                      try {
                        const dateStr = newDate.toISOString().split('T')[0];
                        // API expects PUT with { session_start: "YYYY-MM-DD HH:mm:ss" }
                        const session_start = `${dateStr} ${newTime}:00`;
                        await axiosInstance.put(`/api/bookings/${selectedSession.id}/reschedule`, {
                          session_start,
                        });
                        toast.success("Session rescheduled successfully!");
                        setIsRescheduleOpen(false);
                        refreshSessions();
                      } catch (err: any) {
                        const msg = err?.response?.data?.message ?? err?.response?.data?.error ?? "Failed to reschedule. Please try again.";
                        toast.error(msg);
                      } finally {
                        setIsRescheduling(false);
                      }
                    }}>
                    {isRescheduling ? "Working..." : "Confirm"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Cancel Confirmation Dialog ── */}
      {selectedSession && (
        <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
          <DialogContent className="sm:max-w-md bg-zinc-950 border border-red-900/50 text-white p-0 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/30 mb-2">
                  <Clock className="text-red-500" size={24} />
                </div>
                <DialogTitle className="text-xl font-black uppercase tracking-widest text-white">
                  Cancel Session?
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-sm">
                  Are you sure you want to cancel your session with{" "}
                  <span className="text-white font-bold">{selectedSession.trainerName}</span> on{" "}
                  <span className="text-white font-bold">{selectedSession.date}</span> at{" "}
                  <span className="text-white font-bold">{formatTo12h(selectedSession.time)}</span>?
                </DialogDescription>
                <div className="w-full p-3 bg-red-600/5 border border-red-600/10 rounded-lg">
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest leading-none">Warning</p>
                  <p className="text-xs text-red-400 mt-1">This action cannot be undone and may be subject to our cancellation policy.</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <Button
                  variant="outline"
                  className="h-11 px-6 bg-transparent border-gray-700 text-white hover:bg-gray-800 text-sm font-bold min-w-[120px] transition-all"
                  onClick={() => setIsCancelOpen(false)}>
                  Keep It
                </Button>
                <Button
                  className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white text-sm font-bold min-w-[120px] border border-red-500 shadow-sm hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all"
                  disabled={isCancelling}
                  onClick={async () => {
                    setIsCancelling(true);
                    try {
                      // DELETE /api/bookings/{id}/cancel
                      await axiosInstance.delete(`/api/bookings/${selectedSession.id}/cancel`);
                      toast.success("Session cancelled successfully.");
                      setIsCancelOpen(false);
                      refreshSessions();
                    } catch (err: any) {
                      const msg = err?.response?.data?.message ?? err?.response?.data?.error ?? "Failed to cancel session.";
                      toast.error(msg);
                    } finally {
                      setIsCancelling(false);
                    }
                  }}>
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
