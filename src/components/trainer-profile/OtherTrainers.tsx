import TrainerCard from "@/components/common/TrainerCard";
import useTrainers from "@/hooks/useTrainers";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function OtherTrainers() {
  const { id } = useParams<{ id: string }>();
  const { trainers, loading, error } = useTrainers();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;

  // Filter out current trainer and paginate
  const otherTrainers = trainers.filter((t) => t.id.toString() !== id);
  const totalPages = Math.ceil(otherTrainers.length / cardsPerPage);
  const visibleTrainers = otherTrainers.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <>
      <div className="mt-24 w-[95%] md:w-[85%] mx-auto px-5">
        <div className="flex items-end gap-2 justify-between">
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold">
              Explore Other Trainers
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <svg
                onClick={handlePrev}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`flex items-center w-7 h-7 cursor-pointer border border-white rounded-sm ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <svg
                onClick={handleNext}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`flex items-center w-7 h-7 cursor-pointer border border-white rounded-sm ${currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            <Link
              className="w-32 flex items-center justify-center rounded-md border-orange border text-orange text-sm h-9"
              to={"/trainers#meet-our-trainers"}
            >
              View All
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
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
          <p className="mt-9 text-red-400 text-center">{error}</p>
        )}

        {/* Trainers Grid */}
        {!loading && !error && (
          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleTrainers.length > 0 ? (
              visibleTrainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))
            ) : (
              <>
                <TrainerCard />
                <TrainerCard />
                <TrainerCard />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
