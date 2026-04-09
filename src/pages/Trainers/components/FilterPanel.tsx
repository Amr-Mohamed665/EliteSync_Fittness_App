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
    <div className="w-full max-w-[450px] bg-[#111111] absolute top-full mt-4 right-0 z-50 rounded-xl border border-[#3A3A3C] shadow-2xl flex flex-col">
      {/* header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#3A3A3C]">
        <h2 className="text-xl font-bold text-white">
          Filters
        </h2>
        <button
          onClick={onClose}
          className="text-[#FE4E4E] text-[16px] font-medium hover:text-red-400 transition-colors"
        >
          Close
        </button>
      </div>

      <div className="px-6 py-6 border-b border-[#3A3A3C]">
        <h5 className="text-white text-lg mb-4 font-bold">Type of exercise</h5>
        <div className="flex flex-col gap-3 mb-4">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`border px-6 py-3.5 text-[18px] rounded-xl transition-all duration-200 text-center w-full ${
                selectedType === type
                  ? "bg-[#1A1A1C] border-[#FE4E4E] text-[#FE4E4E] font-medium"
                  : "bg-[#1A1A1C] border-[#3A3A3C] text-gray-300 hover:border-gray-500"
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
