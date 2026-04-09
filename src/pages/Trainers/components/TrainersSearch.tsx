import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import SortPanel from "./SortPanel";

interface TrainersSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSort: string;
  setActiveSort: (sort: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function TrainersSearch({ searchQuery, setSearchQuery, activeSort, setActiveSort, activeFilter, setActiveFilter }: TrainersSearchProps) {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Browse Trainers Title */}
      <div className="mt-10 mb-6 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Browse Trainers
        </h2>
        <p className="text-white/80 text-sm md:text-[16px]">
          Find the perfect trainer by browsing through our list of experts.
        </p>
      </div>

      {/* search & filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 w-full">
        {/* Search Input */}
        <div className="flex-1 flex items-center bg-[#1A1A1C] border border-[#3A3A3C] rounded-xl px-4 h-[54px] w-full">
          <IoSearchOutline className="text-gray-400 text-xl mr-3 min-w-[20px]" />
          <input
            type="text"
            placeholder="Search by name or specialty"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-400 text-[16px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto relative">
          <button 
            onClick={() => {
              setSort(!sort);
              setFilter(false);
            }}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-all duration-200 border border-[#444] rounded-xl px-7 h-[54px] text-white text-[16px] font-medium"
          >
            Sort
            <LuArrowUpDown />
          </button>

          {sort && (
            <SortPanel
              onClose={() => setSort(false)}
              onApply={(selected) => { setActiveSort(selected); setSort(false); }}
              currentSort={activeSort}
            />
          )}

          <button
            onClick={() => {
              setFilter(!filter);
              setSort(false);
            }}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-all duration-200 border border-[#444] rounded-xl px-7 h-[54px] text-white text-[16px] font-medium"
          >
            <CiFilter className="text-xl" />
            Filter
          </button>
          
          {filter && (
            <FilterPanel 
              onClose={() => setFilter(false)} 
              onApply={(selected) => { setActiveFilter(selected); setFilter(false); }}
              currentFilter={activeFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainersSearch;
