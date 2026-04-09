import TrainersHero from "./components/TrainersHero";
import TrainersSearch from "./components/TrainersSearch";
import TopTrainers from "./components/TopTrainers";
import TrainersList from "./components/TrainersList";
import { useState } from "react";

function Trainers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("Most Popular (Highest to Lowest Rating)");
  const [activeFilter, setActiveFilter] = useState("Any");
  const [hasUserSorted, setHasUserSorted] = useState(false);

  const handleSetActiveSort = (sort: string) => {
    setActiveSort(sort);
    setHasUserSorted(true);
  };

  const handleSetActiveFilter = (filter: string) => {
    setActiveFilter(filter);
    setHasUserSorted(true);
  };

  const isDefaultView = searchQuery === "" && !hasUserSorted;

  return (
    <div>
      <div className="bg-[#121212]">
        <TrainersHero />
        <TrainersSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeSort={activeSort}
          setActiveSort={handleSetActiveSort}
          activeFilter={activeFilter}
          setActiveFilter={handleSetActiveFilter}
        />
        {isDefaultView && (
          <TopTrainers />
        )}

      </div>
      <div className="bg-dark-gradient">
        <TrainersList
          searchQuery={searchQuery}
          activeSort={activeSort}
          activeFilter={activeFilter}
          hasUserSorted={hasUserSorted}
        />
      </div>
    </div>
  );
}

export default Trainers;
