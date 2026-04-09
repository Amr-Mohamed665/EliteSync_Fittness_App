import PackageCard from "../../components/common/PackageCard";
import usePackages from "@/hooks/usePackages";
import { Skeleton } from "@/components/ui/skeleton";

function TrainingPackages() {
  const { packages, loading } = usePackages();

  if (loading) {
    return (
      <section className="pt-10 pb-8">
        <div className="text-center mb-6 md:mb-10 px-4">
          <Skeleton className="h-8 w-64 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 items-stretch">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col h-full p-6 sm:p-8 pt-12 sm:pt-14 rounded-2xl border border-white/10 bg-[#1A1A1A]">
              <div className="flex flex-col grow pt-4 pb-2">
                <div className="mb-3 sm:mb-4">
                  <Skeleton className="h-10 sm:h-14 w-3/4 mb-3 bg-white/20" />
                  <div className="flex items-baseline mb-4">
                    <Skeleton className="h-9 sm:h-10 w-24 bg-white/20" />
                    <Skeleton className="h-6 sm:h-7 w-20 ml-2 bg-white/20" />
                  </div>
                  <div className="flex justify-between w-full mb-4">
                    <Skeleton className="h-5 w-20 bg-white/20" />
                    <Skeleton className="h-5 w-20 bg-white/20" />
                  </div>
                  <Skeleton className="h-20 sm:h-24 w-full bg-white/20" />
                </div>
                <div className="space-y-4 mb-8 grow">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
                    <Skeleton className="h-5 w-full bg-white/20" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
                    <Skeleton className="h-5 w-full bg-white/20" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
                    <Skeleton className="h-5 w-3/4 bg-white/20" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full rounded-md bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Use API packages only as requested
  const displayPackages = packages || [];

  return (
    <section className="pt-10 pb-8">
      <div className="text-center mb-6 md:mb-10 px-4">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-3 md:mb-4 tracking-widest uppercase">Training packages</h2>
        <p className="text-text-secondary text-[16px] sm:text-[18px] md:text-[22px] max-w-2xl mx-auto">
          Choose a training plan that matches your goals and schedule
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 items-stretch">
        {displayPackages.map((pkg, index) => (
          <PackageCard key={index} {...pkg} />
        ))}
      </div>
    </section>
  );
}

export default TrainingPackages;
