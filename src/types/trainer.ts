export type Trainer = {
  id: number;
  name: string;
  profile_image: string | null;
  bio: string;
  experience_years: number;
  location: string;
  rating: string | number;
  total_reviews: number;
  specializations: string[];
  price_per_session: number;
};
