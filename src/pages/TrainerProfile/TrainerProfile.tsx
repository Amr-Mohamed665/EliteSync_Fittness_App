import { useParams } from "react-router-dom";
import useTrainer from "@/hooks/useTrainer";
import OtherTrainers from "@/components/trainer-profile/OtherTrainers";
import ScheduleSession from "@/components/trainer-profile/ScheduleSession";
import TrainerCertifictions from "@/components/trainer-profile/TrainerCertifictions";
import TrainerDescription from "@/components/trainer-profile/TrainerDescription";
import TrainerInfo from "@/components/trainer-profile/TrainerInfo";
import TrainingPackages from "@/components/trainer-profile/TrainingPackages";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function TrainerProfile() {
  const { id } = useParams();
  const { trainer, loading, error } = useTrainer(id);
  const [showBubble, setShowBubble] = useState(true);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scheduleRef.current) {
        const scheduleTop = scheduleRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Hide bubble when ScheduleSession is 30% visible in viewport
        if (scheduleTop < windowHeight * 0.7) {
          setShowBubble(false);
        } else {
          setShowBubble(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#121212] min-h-screen">
        <div className="container w-10/12 mx-auto pt-24 pb-12">
          {/* Info Section Skeleton */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <Skeleton className="w-full md:w-[400px] h-[500px] rounded-2xl bg-zinc-800" />
            <div className="flex-1 space-y-8 w-full">
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4 bg-zinc-800" />
                <div className="flex gap-3 flex-wrap">
                  <Skeleton className="h-10 w-32 bg-zinc-800 rounded-md" />
                  <Skeleton className="h-10 w-32 bg-zinc-800 rounded-md" />
                  <Skeleton className="h-10 w-32 bg-zinc-800 rounded-md" />
                </div>
              </div>
              
              <Skeleton className="h-10 w-1/2 bg-zinc-800" />
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
                    <Skeleton className="h-6 w-1/3 bg-zinc-800" />
                  </div>
                ))}
              </div>
              
              <Skeleton className="h-14 w-full md:w-48 bg-zinc-800 rounded-xl" />
            </div>
          </div>

          {/* Description Section Skeleton */}
          <div className="mt-20 space-y-8 pt-12 border-t border-white/10">
            <Skeleton className="h-10 w-1/3 mx-auto bg-zinc-800" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full bg-zinc-800" />
              <Skeleton className="h-6 w-5/6 mx-auto bg-zinc-800" />
              <Skeleton className="h-6 w-4/6 mx-auto bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-500">
          {error || "Trainer not found"}
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Down Bubble */}
      {showBubble && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 transition-opacity duration-300">
          <div className="bg-red-500 text-white px-5 py-4 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-400/50" style={{ animation: 'bounce 5.5s infinite' }}>
            <p className="text-sm font-black uppercase tracking-wider whitespace-nowrap">
              Scroll Down
            </p>
            <p className="text-sm font-bold text-center mt-2 opacity-90">
              to Book Session
            </p>
            <ChevronDown className="w-6 h-6 mx-auto mt-2 animate-pulse" />
          </div>
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-transparent rounded-full" />
        </div>
      )}

      <TrainerInfo trainer={trainer} />
      <TrainerDescription trainer={trainer} />
      <TrainerCertifictions />
      <div ref={scheduleRef}>
        <ScheduleSession trainerId={trainer.id} />
      </div>
      <OtherTrainers />
      <TrainingPackages />
    </>
  );
}

