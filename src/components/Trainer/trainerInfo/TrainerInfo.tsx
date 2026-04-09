import { trainers } from "@/components/lib/constants/Trainer/TrainerData";
import type { Trainer } from "@/lib/types/Trainer/TrainerTypes";
import { DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  trainer: Trainer;
}
const TrainerInfo = ({ trainer }: Props) => {
  console.log(trainer);

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 mb-12 max-w-5xl mx-auto">
      <img
        src={trainer.profile_image || "/trainer.png"}
        alt={trainer.name}
        className="w-full md:w-90  object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-3">{trainer.name}</h3>
        <div className="flex flex-wrap gap-5 mb-3">
          {trainer.specializations.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 text-xs bg-secondary px-3 py-1 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {s}
            </span>
          ))}
        </div>
        <p className=" text-accent-foreground mb-5">
          Helping clients build strength for {trainer.experience_years}{" "}
          experience
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin size={17} className="text-primary" /> {trainer.location}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <DollarSign size={17} className="text-primary" /> From{" "}
          <span className="text-xl"> EGP {trainer.packages[0].price}</span>{" "}
          /session
        </div>
        <Link
          to={`/booking-confirmed/${trainer.id}`}
          className="block w-full sm:w-auto bg-primary px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90  text-center text-accent-foreground hover:scale-102 transition-all duration-300"
        >
          Book
        </Link>
      </div>
    </div>
  );
};

export default TrainerInfo;
