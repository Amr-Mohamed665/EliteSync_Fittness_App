import axiosInstance from "@/lib/Axios/axiosInstance";
import type { Package } from "@/types/package";

export interface Trainer {
  id: number;
  name: string;
  email: string;
  specialization: string;
  experience_years: number;
  rating: number;
  profile_image?: string;
  bio?: string;
}

export interface PackageTrainersResponse {
  status: boolean;
  message: string;
  data: Trainer[];
}

export interface PackageResponse {
  status: boolean;
  message: string;
  data: Package[];
}

export interface SinglePackageResponse {
  status: boolean;
  message: string;
  data: Package;
}

export interface PurchasePackageRequest {
  package_id: number;
  payment_method_id?: number;
}

export interface PurchasePackageResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    package_id: number;
    user_id: number;
    status: string;
    created_at: string;
  };
}

export const getPackages = async (): Promise<PackageResponse> => {
  const { data } = await axiosInstance.get<PackageResponse>("/api/packages");
  return data;
};

export const getPackage = async (packageId: number): Promise<SinglePackageResponse> => {
  const { data } = await axiosInstance.get<SinglePackageResponse>(`/api/packages/${packageId}`);
  return data;
};

export const purchasePackage = async (request: PurchasePackageRequest): Promise<PurchasePackageResponse> => {
  const { data } = await axiosInstance.post<PurchasePackageResponse>("/api/packages/purchase", request);
  return data;
};

export const getUserPackages = async (): Promise<PackageResponse> => {
  const { data } = await axiosInstance.get<PackageResponse>("/api/profile/packages");
  return data;
};

export const getPackageTrainers = async (packageId: number): Promise<PackageTrainersResponse> => {
  const { data } = await axiosInstance.get<PackageTrainersResponse>(`/api/packages/${packageId}/trainers`);
  return data;
};
