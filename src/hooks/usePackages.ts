
import { useQuery } from "@tanstack/react-query";
import type { Package, UiPackage } from "@/types/package";
import axiosInstance from "@/lib/Axios/axiosInstance";

const usePackages = () => {
  const { data: packages, isLoading: loading, error } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: Package[] }>("/api/landing/packages");
      
      console.log("API response:", response.data);
      
      // Handle different response structures
      let rawData: Package[] = [];
      
      if (Array.isArray(response.data)) {
        rawData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        rawData = response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        // Try to find an array in the response
        const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
        if (possibleArray) rawData = possibleArray as Package[];
      }
      
      console.log("Parsed rawData:", rawData);
      
      if (!Array.isArray(rawData) || rawData.length === 0) {
        console.error("Unexpected API response format or empty data:", response.data);
        return [];
      }

      return rawData.map((pkg: any): UiPackage => {
        // Handle features as string array from API
        const rawFeatures: string[] = pkg.features || [];
        const features: string[] = rawFeatures.map((feat: string) => {
          switch (feat) {
            case "progress_tracking": return "Progress Tracking";
            case "nutrition_plan": return "Nutrition Plan Included";
            case "priority_booking": return "Priority Scheduling";
            case "full_access": return "Full Session Access";
            default: return feat.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
          }
        });
        
        console.log("Package:", pkg.title, "Features:", features, "Raw features:", pkg.features);

        return {
          id: pkg.id,
          title: pkg.title || "Package",
          price: pkg.price ? `${pkg.price}` : "",
          duration: pkg.duration_days ? `${pkg.duration_days} DAYS` : "60 MIN",
          sessions: pkg.sessions ? `${pkg.sessions} ${Number(pkg.sessions) === 1 ? 'SESSION' : 'SESSIONS'}` : "0 SESSIONS",
          description: pkg.description || "",
          features: features.length > 0 ? features : ["Basic Features"],
          isRecommended: !!pkg.is_recommended,
        };
      });
    },
  });

  const errorMessage = error instanceof Error ? error.message : null;

  return { 
    packages: Array.isArray(packages) ? packages : [], 
    loading, 
    error: errorMessage 
  };
};

export default usePackages;
