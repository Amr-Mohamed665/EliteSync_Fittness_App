export type PackageFeatures = {
  progress_tracking: boolean;
  nutrition_plan: boolean;
  priority_booking: boolean;
  full_access: boolean;
  [key: string]: boolean;
};

export type Package = {
  id: number;
  title: string;
  description: string;
  price: number;
  sessions: number;
  duration_days: number;
  features: string[];
  is_recommended?: boolean;
};

export type UiPackage = {
  id: number;
  title: string;
  price: string;
  duration: string;
  sessions: string;
  description: string;
  features: string[];
  isRecommended: boolean;
};
