import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";

interface SortPanelProps {
  onClose: () => void;
  onApply: (sort: string) => void;
  currentSort: string;
}

const SortPanel = ({ onClose, onApply, currentSort }: SortPanelProps) => {
  const [activeSort, setActiveSort] = useState(currentSort);
  const sortOptions = ["Most Popular (Highest to Lowest Rating)", "Experienced (Highest to Lowest Years of Experience)", "Price (Lowest to Highest)", "Price (Highest to Lowest)"];

  const handleApply = () => {
    onApply(activeSort);
    onClose();
  };

  const renderLabel = (option: string) => {
    if (option === "Experienced (Highest to Lowest Years of Experience)") {
      return (
        <>
          <span className="font-bold text-[22px]">{option.split(" (")[0]}</span>
          <br />
          <span className="text-[18px] opacity-80">(Highest to Lowest Years of Experience)</span>
        </>
      );
    }
    if (option.includes(" (")) {
      return (
        <>
          <span className="font-bold text-[22px]">{option.split(" (")[0]}</span>
          <br />
          <span className="text-[18px] opacity-80">({option.split(" (")[1]}</span>
        </>
      );
    }
    return <span className="font-bold text-[22px]">{option}</span>;
  };

  return (
    <div className="w-full md:w-[500px] bg-[#111111] absolute top-full mt-4 right-0 z-50 rounded-xl border border-[#3A3A3C] shadow-2xl flex flex-col">
      {/* header */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-[#3A3A3C]">
        <h2 className="text-xl font-medium text-white">
          Sort
        </h2>
        <button
          onClick={onClose}
          className="text-[#FE4E4E] text-[15px] font-medium hover:text-red-400 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Options */}
      <div className="px-8 py-4">
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <div
              key={option}
              onClick={() => setActiveSort(option)}
              className={`flex justify-between items-center py-4 border-b border-[#3A3A3C] cursor-pointer transition-colors ${
                activeSort === option
                  ? "text-[#FE4E4E]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span className="text-[22px] leading-snug">
                {renderLabel(option)}
              </span>
              {activeSort === option && (
                <div className="px-2">
                  <IoCheckmark className="text-xl" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-8 pb-6 pt-2">
        <button
          onClick={handleApply}
          className="w-full bg-[#FE4E4E] hover:bg-[#e04a4a] transition-colors text-white font-medium py-3.5 rounded-lg text-lg"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default SortPanel;
