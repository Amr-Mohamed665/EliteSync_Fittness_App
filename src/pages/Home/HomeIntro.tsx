import gymbackground from "../../../public/gymbackground.png";
import { Link } from "react-router-dom";
import StarIcone from "./aseta/starIcone.png";

function HomeIntro() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${gymbackground})` }}
        className="relative overflow-hidden md:h-[90vh] h-[80vh] flex items-center justify-center bg-center bg-cover before:absolute before:inset-0 before:bg-black/70"
      >
        <div className=" z-50 flex flex-col gap-3 w-[95%] md:w-[60%] lg:w-[60%] ">
          <p className=" p-1 rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25  mb-2">
            +50 Certified Elite Trainers
          </p>
          <p className=" text-4xl  md:text-6xl font-extrabold">
            Train Smarter,{" "}
          </p>
          <p className=" text-orange text-4xl  md:text-6xl font-extrabold">
            Perform Better.
          </p>
          <p className=" text-gray-400 text-sm font-medium max-w-lg">
            Book elite personal training sessions with certified professionals.
            Science-backed programs tailored to your goals — starting in
            minutes.
          </p>
          <div className=" flex gap-5 md:gap-10 mt-3">
            <Link
              className=" w-44 flex items-center justify-center rounded-md bg-orange h-10 "
              to={"/packages"}
            >
              Book Now
            </Link>
            <Link
              className=" w-44 flex items-center justify-center rounded-md border-[1px] border-gray-200 h-10 "
              to={"/trainers"}
            >
              Meet Our Trainers
            </Link>
          </div>
          <div className=" grid gap-5 grid-cols-2 md:grid-cols-4 mt-4 ">
            <div>
              <p className=" text-xl font-bold">+50</p>
              <p className=" text-gray-400 text-sm font-medium">
                Active Trainers
              </p>
            </div>

            <div>
              <p className=" text-xl font-bold">+2400</p>
              <p className=" text-gray-400 text-sm font-medium">
                Happy Clients
              </p>
            </div>
            <div>
              <p className=" text-xl font-bold">+18,000</p>
              <p className=" text-gray-400 text-sm font-medium">
                Sessions Completed
              </p>
            </div>
            <div>
              <p className=" text-xl font-bold flex items-center gap-1">
                <img src={StarIcone} alt="" /> 4.9
              </p>
              <p className=" text-gray-400 text-sm font-medium">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" shadow h-[0.5px]"></div>
    </>
  );
}

export default HomeIntro;
