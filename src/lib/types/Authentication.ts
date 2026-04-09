export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SinInFormData {
  email: string
  password: string
}


export interface RegisterResponse {
  status: boolean;
  message: string;
  token: string;
  user: User;
  errors?: { [key: string]: string[] };
}

export interface User {
  name: string;
  email: string;
  phone: any;
  role: string;
  updated_at: string;
  created_at: string;
  id: number;
}



export interface sinInResponse {
  status: boolean
  message: string
  token: string
  user: UsersinIn
  is_complete_the_profile?: number
}

interface UsersinIn {
  id: number
  name: string
  email: string
  role: string
  phone: any
  profile_image: any
  status: string
  email_verified_at: any
  created_at: string
  updated_at: string
}

export interface CompleteProfileFormData {
  gender: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  fitness_goal: string;
  fitness_level: string;
  workout_location: string;
  preferred_training_days: string;
}

export interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
  token?: string;
}
