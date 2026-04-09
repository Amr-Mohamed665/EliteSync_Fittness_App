import { FaStar, FaArrowRight } from "react-icons/fa6";

import { IoLocationOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

import type { Trainer } from "@/types/trainer";

import imageTrainer from "../../../public/c4925f322ee533b6cd71573448267f2829ac0fda (4).png";



type TrainerCardProps = {

  trainer?: Trainer;

};



function TrainerCard({ trainer }: TrainerCardProps) {

  const name = trainer?.name ?? "Ahmed Hassan";

  const imageUrl = trainer?.profile_image ?? imageTrainer;

  const rating = trainer?.rating ?? "4.9";

  const location = trainer?.location ?? "Nasr City, Cairo";

  const specializations = trainer?.specializations ?? [];

  const trainerId = trainer?.id;

  const pricePerSession = trainer?.price_per_session;



  return (

    <div className="rounded-2xl overflow-hidden bg-[#2C2C2E] text-white shadow-lg mx-auto font-sans w-full flex flex-col">

      {/* Image */}

      <div className="relative">

        {/* Rating Badge */}

        <div className="absolute top-4 right-4 bg-red-900/40 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-red-500/20">

          <FaStar className="text-[#FF4D4F] text-[13px]" />

          <span className="text-white font-medium text-sm">{rating}</span>

        </div>





        <img

          src={imageUrl}

          alt={name}

          className="h-[250px] w-full object-cover object-top"

          onError={(e) => {

            (e.target as HTMLImageElement).src = imageTrainer;

          }}

        />

      </div>



      {/* Content */}

      <div className="p-6 bg-[#2D2D2D] flex flex-col flex-1">

        {/* Name */}

        <div className="flex justify-between items-start mb-1">

          <h4 className="font-bold text-2xl text-white tracking-wide leading-tight">{name}</h4>

        </div>



        {/* Price */}

        <p className="text-2xl mb-3 text-right">

          {pricePerSession != null ? (

            <>

              <span className="text-[#FF4D4F]">EGP {pricePerSession}</span>

              <span className="text-white"> /session</span>

            </>

          ) : (

            "-"

          )}

        </p>



        {/* Specializations */}

        {specializations.length > 0 && (

          <div className="flex flex-wrap gap-2 mb-4">

            {specializations.map((spec) => (

              <span

                key={spec}

                className="px-2 py-1 bg-white/20 text-white text-xs rounded-md font-medium"

              >

                {spec}

              </span>

            ))}

          </div>

        )}



        {/* Location */}

        <div className="flex items-center gap-2 mb-4 text-gray-300">

          <IoLocationOutline className="text-orange text-[20px] shrink-0" />

          <p className="text-[15px]">{location}</p>

        </div>



        {/* Divider */}

        <div className="border-t border-white/10 mb-4" />



        {/* Button */}

        <div className="mt-auto">

          {trainerId ? (

            <Link

              to={`/trainers/${trainerId}`}

              className="w-full bg-orange hover:bg-[#e04345] transition-colors text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 text-[15px]"

            >

              View Profile <FaArrowRight />

            </Link>

          ) : (

            <button className="w-full bg-orange hover:bg-[#e04345] transition-colors text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 text-[15px]">

              View Profile <FaArrowRight />

            </button>

          )}

        </div>

      </div>

    </div>

  );

}



export default TrainerCard;

