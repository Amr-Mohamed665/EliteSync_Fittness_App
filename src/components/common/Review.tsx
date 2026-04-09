import { Quote, Star } from "lucide-react";
import { useState } from "react";
import type { ReviewInterface } from "@/lib/types/Trainer/TrainerTypes";
import { formatDate } from "../utils/formateDate";

interface Props {
  reviews: ReviewInterface[];
}

function Review({ reviews }: Props) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="mb-12 p-5">
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center border border-border rounded-xl p-10 bg-black">
          <Quote size={40} className="text-primary mb-4 opacity-70" />

          <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>

          <p className="text-sm text-muted-foreground max-w-md">
            Be the first to share your experience. Your feedback helps others
            make better decisions.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 mx-auto">


          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {(reviews.length <= 3 
              ? reviews 
              : [0, 1, 2].map((offset) => reviews[(current + offset) % reviews.length])
            ).map((r, uniqueIndex) => (
              <div
                key={`${r.id}-${uniqueIndex}`}
                className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: Number(r.rating) }).map((_, j) => (
                      <Star
                        key={j}
                        size={18}
                        className={
                          j < (Number(r.rating) ?? 5)
                            ? "text-primary fill-primary"
                            : "text-accent-foreground fill-accent-foreground"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    "{r.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <div className="w-11 h-11 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">
                    <img
                      src="/trainer.png"
                      alt="trainer Photo"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{r.user_id}</p>
                    {r.created_at && (
                      <p className="text-xs text-muted-foreground">
                        {formatDate(r.created_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Review;
