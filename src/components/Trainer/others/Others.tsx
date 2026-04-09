import TrainerCard from "@/components/common/TrainerCard";
import { trainers } from "@/components/lib/constants/Trainer/TrainerData";

const otherTrainers = trainers.slice(1, 4);

const Others = () => {
  return (
    <div className="max-w-7xl p-5 mx-auto ">
      <h3 className="text-2xl font-bold text-center mb-2">
        Explore other trainers
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Discover more professional coaches who can help you reach your goals
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherTrainers.map((t) => (
          <TrainerCard key={t.id} />
        ))}
      </div>
    </div>
  );
};

export default Others;
