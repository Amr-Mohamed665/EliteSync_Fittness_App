import { useParams } from "react-router-dom";
import useTrainer from "@/hooks/useTrainer";
import OtherTrainers from "@/components/trainer-profile/OtherTrainers";
import ScheduleSession from "@/components/trainer-profile/ScheduleSession";
import TrainerCertifictions from "@/components/trainer-profile/TrainerCertifictions";
import TrainerDescription from "@/components/trainer-profile/TrainerDescription";
import TrainerInfo from "@/components/trainer-profile/TrainerInfo";
import TrainingPackages from "@/components/trainer-profile/TrainingPackages";

import { Skeleton } from "@/components/ui/skeleton";

export default function TrainerProfile() {
  const { id } = useParams();
  const { trainer, loading, error } = useTrainer(id);

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
      <TrainerInfo trainer={trainer} />
      <TrainerDescription trainer={trainer} />
      <TrainerCertifictions />
      <ScheduleSession trainerId={trainer.id} />
      <OtherTrainers />
      <TrainingPackages />
    </>
  );
}

