export interface PackageInterface {
  data: PackageData[];
}

export interface PackageData {
  id: number;
  title: string;
  description: string;
  sessions: number;
  duration_days: number;
  features: Features;
}

export interface Features {
  progress_tracking: boolean;
  nutrition_plan: boolean;
  priority_booking: boolean;
  full_access: boolean;
}
