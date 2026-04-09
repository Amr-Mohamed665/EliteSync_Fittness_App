import { FaCheck, FaLocationDot, FaStar } from "react-icons/fa6";
import { BiMoney } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import type { Trainer } from "@/types/trainer";
import trainerFallbackImage from "../../assets/img/trainerIMG.png";
import axiosInstance from "@/lib/Axios/axiosInstance";

type TrainerInfoProps = {
  trainer: Trainer;
};

export default function TrainerInfo({ trainer }: TrainerInfoProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-linear-to-b from-[#363636] to-[#121212] pb-12">
        <h2 className="text-center text-white text-4xl font-semibold py-12">
          Meet your Trainer
        </h2>
        <div className="container w-10/12 mx-auto flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={trainer.profile_image || trainerFallbackImage}
              alt={trainer.name}
              className="w-full rounded-2xl object-cover h-[400px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = trainerFallbackImage;
              }}
            />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-4xl text-white py-2 px-1 font-bold">
              {trainer.name}
            </h3>
            <ul className="flex gap-4 flex-wrap my-4">
              {trainer.specializations.map((spec) => (
                <li
                  key={spec}
                  className="hover:bg-primary transition-colors duration-300 px-8 py-2 before:mx-3 bg-black text-white rounded-md relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:rounded-full before:content-[''] before:w-3 before:h-3 before:bg-red-500 font-light"
                >
                  {spec}
                </li>
              ))}
            </ul>
            <p className="my-6 text-white text-2xl font-semibold">
              Helping clients For Build Strength {trainer.experience_years}+ Years
            </p>
            <ul className="space-y-4 text-white/80">
              <li className="flex gap-4 items-center">
                <span>
                  <FaCheck className="bg-green-500 w-6 h-6 p-1 rounded-full text-white" />
                </span>
                <p className="text-lg">Available This Week</p>
              </li>
              <li className="flex gap-4 items-center">
                <span>
                  <FaStar className="w-6 h-6 text-red-600" />
                </span>
                <p className="text-lg">
                  {trainer.rating} ({trainer.total_reviews} reviews)
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <span>
                  <FaLocationDot className="w-6 h-6 text-red-600" />
                </span>
                <p className="text-lg">{trainer.location}</p>
              </li>
              <li className="flex gap-4 items-center">
                <span>
                  <BiMoney className="w-6 h-6 text-red-600" />
                </span>
                <p className="text-lg">
                  From EGP {trainer.price_per_session} / session
                </p>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className="w-full md:w-48 bg-orange hover:bg-[#ff3333] transition-colors text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2"
                onClick={() => {
                  // Clear any existing scheduled booking data
                  sessionStorage.removeItem('scheduledBooking');
                  navigate(`/booking/${trainer.id}`);
                }}
              >
                Book Now
              </button>

              <button
                className="w-full md:w-48 bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2"
                onClick={async () => {
                  try {
                    // GET existing conversation (read-only); Page will POST to create if needed
                    const { data } = await axiosInstance.get(`/api/conversations?trainer_id=${trainer.id}`);

                    // Resolve conversation ID from various possible response shapes
                    const convId =
                      data?.id ??
                      data?.conversation?.id ??
                      data?.conversation_id ??
                      data?.data?.id ??
                      (Array.isArray(data) && data[0]?.id) ??
                      (Array.isArray(data?.data) && data.data[0]?.id) ??
                      null;

                    if (convId) {
                      navigate(`/profile/messages/${convId}`);
                    } else {
                      // No existing conversation — let Messages page handle creating one
                      navigate(`/profile/messages?trainer=${trainer.id}`);
                    }
                  } catch (err: any) {
                    console.error("Failed to start conversation", err);
                    // Fallback: still open messages page so user can send first message
                    navigate(`/profile/messages?trainer=${trainer.id}`);
                  }
                }}
              >
                Message Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
