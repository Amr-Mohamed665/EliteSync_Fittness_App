import { useState } from "react";

interface FilterPanelProps {
  onClose: () => void;
  onApply: (type: string) => void;
  currentFilter: string;
}

const FilterPanel = ({ onClose, onApply, currentFilter }: FilterPanelProps) => {
  const [selectedType, setSelectedType] = useState(currentFilter);
  const types = ["Any", "HIIT", "Strength", "Cardio", "Nutrition"];

  const handleApply = () => {
    onApply(selectedType);
    onClose();
  };

  return (
    <div className="w-full lg:w-[650px] min-h-[500px] bg-[#111111] absolute top-full mt-4 right-0 z-50 rounded-xl border border-[#3A3A3C] shadow-2xl">
      {/* header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#3A3A3C]">
        <div className="flex-1"></div>
        <h2 className="text-xl font-bold text-white flex-1 text-center">
          Filters
        </h2>
        <div className="flex-1 text-right">
          <button
            onClick={onClose}
            className="text-[#FE4E4E] text-[16px] font-medium hover:text-red-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="px-6 py-6 border-b border-[#3A3A3C]">
        <h5 className="text-white text-lg mb-4 font-bold">Type</h5>
        <div className="flex gap-3 mb-4 flex-wrap">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`border px-6 py-2.5 text-[15px] rounded-full transition-all duration-200 ${
                selectedType === type
                  ? "bg-[#FE4E4E] border-[#FE4E4E] text-white font-medium"
                  : "border-[#3A3A3C] text-gray-300 hover:bg-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-8">
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

export default FilterPanel;
