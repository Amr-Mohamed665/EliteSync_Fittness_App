import { SearchIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";

function ExplainSection() {
  return (
    <div className=" flex flex-col gap-3 items-center my-9 pt-5   w-[95%] md:w-[85%] mx-auto px-5 ">
      <p className=" p-1 rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25  mb-2">
        How It works
      </p>
      <p className=" text-3xl text-center md:text-4xl font-bold">Three Steps to Your Best Self</p>
      <p className=" text-gray-400 text-sm font-medium max-w-lg text-center">
        We've made the booking process frictionless so you can focus on what
        matters — your training.
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-7 my-3 ">
        <div className="w-full  bg-input flex flex-col items-center align-middle p-4 gap-2 rounded-md">
          <SearchIcon
            size={50}
            className=" p-2 rounded-md text-orange border-orange border w-fit font-bold bg-orange-800/25 "
          />
          <p className=" text-xl font-bold ">Discover </p>
          <p className=" text-gray-400 text-sm font-medium max-w-lg text-center">
            Browse our curated roster of certified trainers. Filter by
            specialty, availability, and price to find your perfect match.
          </p>
        </div>
        <div className="w-full  bg-input flex flex-col items-center align-middle p-4 gap-2 rounded-md">
          <MapPinIcon
            size={50}
            className=" p-2 rounded-md text-orange border-orange border w-fit font-bold bg-orange-800/25 "
          />
          <p className=" text-xl font-bold ">Choose Mode </p>
          <p className=" text-gray-400 text-sm font-medium max-w-lg text-center">
            Select from in-person, virtual, or hybrid training sessions. Pick
            the package that fits your goals and budget.
          </p>
        </div>
        <div className="w-full  bg-input flex flex-col items-center align-middle p-4 gap-2 rounded-md">
          <CalendarIcon
            size={50}
            className=" p-2 rounded-md text-orange border-orange border w-fit font-bold bg-orange-800/25 "
          />
          <p className=" text-xl font-bold ">Book & Train </p>
          <p className=" text-gray-400 text-sm font-medium max-w-lg text-center">
            Lock in your preferred time slot instantly. Receive confirmation and
            start your transformation journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExplainSection;
