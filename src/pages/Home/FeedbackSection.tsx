import Review from "@/components/common/Review";
import "../../index.css";
import type { ReviewInterface } from "@/lib/types/Trainer/TrainerTypes";

const MOCK_REVIEWS: ReviewInterface[] = [
  {
    id: 1,
    user_id: 101,
    comment: "This has completely transformed my daily routine. The personalized plans are phenomenal and I feel stronger every day!",
    rating: "5",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 102,
    comment: "Exceptional platform with top-tier coaches. I finally found the motivation I was missing. Highly recommend!",
    rating: "5",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 103,
    comment: "The progress I've seen in just three months is incredible. The trainers really listen to your feedback.",
    rating: "4",
    created_at: new Date().toISOString(),
  }
];

function FeedbackSection() {
  return (
    <div className=" bg-dark-gradient py-11">
      <div className=" my-5 w-[90%] sm:w-[75%] md:w-[60%] mx-auto flex flex-col items-center gap-2">
        <p className=" px-3 py-1  rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25  mb-2">
          Testimonials
        </p>

        <h2 className=" text-white text-3xl text-center md:text-5xl font-extrabold ">
          Proven Results,{" "}
          <span className=" text-orange mt-2">Trusted Voices</span>
        </h2>
        <Review reviews={MOCK_REVIEWS} />
      </div>
    </div>
  );
}

export default FeedbackSection;
