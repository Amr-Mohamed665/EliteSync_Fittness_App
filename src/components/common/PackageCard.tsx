import { useNavigate } from "react-router-dom";

import { Zap, CheckCircle2 } from "lucide-react";

import type { UiPackage } from "@/types/package";



const PackageCard: React.FC<UiPackage> = ({

  id,

  title = "Package",

  price = "0",

  duration = "Duration",

  sessions = "Sessions",

  description = "",

  features = [],

  isRecommended = false,

}) => {

  const navigate = useNavigate();

  return (

    <div

      className={`relative flex flex-col h-full p-6 sm:p-8 pt-12 sm:pt-14 rounded-2xl border transition-all duration-300 group hover:border-[#FF4D4D] ${isRecommended

          ? "bg-[#2D0505] border-orange z-10 shadow-[0_0_30px_rgba(255,77,77,0.15)]"

          : "bg-[#1A1A1A] border-white/10"

        }`}

    >

      {isRecommended && (

        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#FF4D4D] text-white text-[13px] font-black py-2 px-6 rounded-b-lg uppercase tracking-widest z-20 flex items-center justify-center gap-2 whitespace-nowrap shadow-md">

          <Zap size={13} className="fill-white text-white" /> Recommended

        </div>

      )}



      <div className="flex flex-col grow pt-4 pb-2">

        <div className="mb-3 sm:mb-4">

          <h3 className="text-2xl sm:text-3xl font-bold mb-3 min-h-12 sm:min-h-14 flex items-center leading-tight">

            {title}

          </h3>

          <div className="flex items-baseline mb-4">

            <span className="text-orange text-2xl sm:text-3xl font-extrabold uppercase leading-none">

              {price?.toString().includes("EGP") || price?.toString().includes("$") ? price : `EGP ${price}`}

            </span>

            <span className="text-text-secondary text-base sm:text-lg ml-2">

              / package

            </span>

          </div>

          <div className="flex justify-between w-full text-sm sm:text-base font-bold text-text-secondary uppercase tracking-wider mb-4">

            <span>{duration}</span>

            <span>{sessions}</span>

          </div>

          <div className="min-h-16 sm:min-h-20">

            <p className="text-text-secondary text-sm sm:text-base leading-snug line-clamp-4">

              {description}

            </p>

          </div>

        </div>



        <ul className="space-y-4 mb-8 grow">

          {features?.map((feature, index) => (

            <li key={index} className="flex items-center space-x-4 text-base md:text-lg">

              <CheckCircle2 size={24} className="text-orange shrink-0" />

              <span className="text-gray-300 font-bold">{feature}</span>

            </li>

          ))}

        </ul>



        <button

          onClick={() =>

          navigate(`/package-booking/${id}`)

        }

          className={`w-full py-2.5 rounded-md font-bold text-sm transition-all duration-300 transform cursor-pointer border ${

            isRecommended

              ? "bg-[#FF4D4D] text-white border-transparent hover:bg-[#ff3333] shadow-[0_0_20px_rgba(255,77,77,0.3)]"

              : "bg-transparent border-white/20 text-white hover:bg-white/5"

            }`}

        >

          Book

        </button>

      </div>

    </div>

  );

};



export default PackageCard;

