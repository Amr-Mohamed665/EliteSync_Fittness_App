import PackageCard from "@/components/common/PackageCard";
import usePackages from "@/hooks/usePackages";

function TrainingPackages() {
  const { packages, loading } = usePackages();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  // Use API packages only as requested
  const displayPackages = packages || [];

  return (
    <section className="mt-12 pb-8 mb-12">
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
