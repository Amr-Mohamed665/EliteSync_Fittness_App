import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function FitnessSlider() {
  const images = [
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getStyles = (index: number) => {
    let offset = index - currentIndex;
    const total = images.length;
    // Normalize offset to handle circular wrapping correctly
    if (offset > Math.floor(total / 2)) offset -= total;
    else if (offset < -Math.floor(total / 2)) offset += total;

    const absOffset = Math.abs(offset);

    // Dynamic styling values to match the screenshot's 3D perspective
    const zIndex = 30 - absOffset * 10;

    // Scale down a bit more aggressively to show layers
    const scale = 1 - absOffset * 0.2;

    // Decrease the translateX percentage significantly so they overlap each other like cards
    const translateX = offset * 25;

    return {
      zIndex,
      transform: `translateX(${translateX}%) scale(${scale})`,
      transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 pb-2 overflow-hidden">
      {/* 3D Carousel Track */}
      <div className="relative w-full h-[400px] flex justify-center items-center max-w-[1200px]">
        {images.map((img, index) => {
          let offset = index - currentIndex;
          const total = images.length;
          if (offset > Math.floor(total / 2)) offset -= total;
          else if (offset < -Math.floor(total / 2)) offset += total;

          const isCenter = offset === 0;

          return (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="absolute w-[280px] sm:w-[500px] lg:w-[812px] h-[300px] sm:h-[350px] lg:h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-xl bg-[#121212]"
              style={getStyles(index)}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay overlaying inactive cards with a dark tint */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
                  isCenter ? "opacity-0" : "opacity-[0.65]"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-10 flex items-center justify-between gap-6 px-4 py-2">
        <button
          onClick={handlePrev}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <FaArrowLeft />
        </button>

        <div className="flex gap-3 items-center">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-3 h-3 bg-blue-500 shadow-[0_0_10px_white]"
                  : "w-2 h-2 bg-[#999999] hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
