import TrainerCard from "../../../components/common/TrainerCard";
import useTrainers from "@/hooks/useTrainers";

interface TrainersListProps {
  searchQuery: string;
  activeSort: string;
  hasUserSorted?: boolean;
  activeFilter?: string;
}

function TrainersList({ searchQuery, activeSort, hasUserSorted, activeFilter = "Any" }: TrainersListProps) {
  const { trainers, loading, error } = useTrainers(searchQuery);

  let filteredTrainers = trainers;

  if (activeFilter !== "Any") {
    let filterTerms = [activeFilter.toLowerCase()];
    
    if (activeFilter === "HIIT") filterTerms = ["crossfit", "cardio & endurance"];
    if (activeFilter === "Strength") filterTerms = ["muscle gain", "sports performance"];
    if (activeFilter === "Cardio") filterTerms = ["cardio & endurance", "senior fitness"];
    if (activeFilter === "Nutrition") filterTerms = ["nutrition coaching"];

    filteredTrainers = filteredTrainers.filter((trainer) =>
      trainer.specializations?.some((spec) => {
        const lowerSpec = spec.toLowerCase();
        return filterTerms.some(term => lowerSpec.includes(term));
      })
    );
  }

  if (searchQuery) {
    filteredTrainers = filteredTrainers.filter(
      (trainer) =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trainer.specializations &&
          trainer.specializations.some((spec) =>
            spec.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        trainer.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sorting Logic — applied after filtering
  const sortedTrainers = [...filteredTrainers].sort((a, b) => {
    if (activeSort === "Most Popular (Highest to Lowest Rating)") {
      const ratingA = parseFloat(String(a.rating ?? 0));
      const ratingB = parseFloat(String(b.rating ?? 0));
      return ratingB - ratingA;
    }
    if (activeSort === "Experienced (Highest to Lowest Years of Experience)") {
      return (b.experience_years ?? 0) - (a.experience_years ?? 0);
    }
    if (activeSort === "Price (Lowest to Highest)") {
      return (a.price_per_session ?? 0) - (b.price_per_session ?? 0);
    }
    if (activeSort === "Price (Highest to Lowest)") {
      return (b.price_per_session ?? 0) - (a.price_per_session ?? 0);
    }
    return 0;
  });

  const isDefaultView = searchQuery === "" && !hasUserSorted;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">

      {/* Title */}
      {isDefaultView && (
        <div className="mt-10 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Meet Our <span className="text-[#FE4E4E]">Trainers</span>
          </h2>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-[#2C2C2E] shadow-lg mx-auto w-full animate-pulse"
            >
              <div className="h-[250px] bg-[#3A3A3C]" />
              <div className="p-6 space-y-4">
                <div className="h-5 bg-[#3A3A3C] rounded w-2/3" />
                <div className="h-4 bg-[#3A3A3C] rounded w-full" />
                <div className="h-4 bg-[#3A3A3C] rounded w-3/4" />
                <div className="h-10 bg-[#3A3A3C] rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <p className="text-red-400 text-center py-8">{error}</p>
      )}

      {/* Trainers Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTrainers.length > 0 ? (
            sortedTrainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))
          ) : (searchQuery || activeFilter !== "Any") ? (
            <div className="col-span-full py-12 text-center text-gray-400">
              No trainers found matching your filter/search criteria.
            </div>
          ) : (
            <>
              <TrainerCard />
              <TrainerCard />
              <TrainerCard />
              <TrainerCard />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TrainersList;
