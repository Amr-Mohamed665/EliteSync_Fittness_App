import type { Trainer } from "@/types/trainer";

type TrainerDescriptionProps = {
  trainer: Trainer;
};

export default function TrainerDescription({ trainer }: TrainerDescriptionProps) {
  return (
    <>
      <div className="container w-10/12 mx-auto py-12 text-center border-t border-white/10">
        <h2 className="text-4xl font-bold text-white">Get to know {trainer.name}</h2>
        <p className="max-w-5xl py-8 mx-auto text-gray-400 text-lg leading-relaxed whitespace-pre-line">
          {trainer.bio}
        </p>
      </div>
    </>
  );
}
