// MyPackages.tsx
import { Check, Package, ArrowUpRight } from "lucide-react";
import ProgressBar from "../../components/common/UserProfile/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyPackage } from "@/lib/Api/Authentication/profile";
import useUserPackage, { getRawPackageFeatures } from "@/hooks/useUserPackage";

interface Package {
  id?: number;
  name: string;
  status: "Active" | "Expired";
  expiryDate: string;
  sessionsRemaining: number;
  totalSessions: number;
  includes: string[];
}

export default function MyPackages() {
  const navigate = useNavigate();
  const { data: pack, isLoading } = useQuery<Package>({
    queryKey: ["profile-packages"],
    queryFn: getMyPackage,
  });
  
  const { profileOverviewPackageName, packageFeatures, isLoading: packageLoading } = useUserPackage();

  console.log("Package status:", pack?.status);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 mx-4 sm:mx-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">My Packages</h2>
        <div className="animate-pulse border border-[#a1a1a1] rounded-2xl h-64"></div>
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="flex flex-col gap-5 mx-4 sm:mx-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">My Packages</h2>
        <p className="text-[#a1a1a1]">No active packages</p>
        <button
          onClick={() => navigate("/packages")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all duration-200 cursor-pointer w-full sm:w-auto">
          Browse Packages
          <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mx-4 sm:mx-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">My Packages</h2>

      <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-[#a1a1a1]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Package size={20} className="text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl text-white">
                  {packageLoading ? "Loading..." : (profileOverviewPackageName || pack.name || "Package")}
                </span>
                <span
                  className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                    pack.status === "Active" || !pack.status || pack.status !== "Expired"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500/15 text-gray-400"
                  }`}>
                  {pack.status || "Active"}
                </span>
              </div>
              {pack.expiryDate && (
                <span className="text-md text-[#a1a1a1] mt-0.5 block">
                  Expires on {pack.expiryDate}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:-translate-y-0.5 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer w-full sm:w-auto">
            Upgrade Package
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Progress - Calculate total based on LAST PAID package from payment history */}
        {(() => {
          // Get the last paid package name from useUserPackage hook
          // Note: profileOverviewPackageName returns formatted names like "Single Session Package"
          const lastPaidPackageName = (profileOverviewPackageName || "").toLowerCase();
          const currentPackageName = (pack.name || "").toLowerCase();
          
          console.log("DEBUG - profileOverviewPackageName:", profileOverviewPackageName);
          console.log("DEBUG - lastPaidPackageName:", lastPaidPackageName);
          console.log("DEBUG - currentPackageName:", currentPackageName);
          console.log("DEBUG - pack.name:", pack.name);
          console.log("DEBUG - pack:", pack);
          
          let totalSessions = 1;
          
          // Determine total based on LAST PAID package (matching formatted names)
          if (lastPaidPackageName.includes("single session")) {
            totalSessions = 1;
          } else if (lastPaidPackageName.includes("premium")) {
            totalSessions = 50; // Premium = 50 sessions
          } else if (lastPaidPackageName.includes("monthly")) {
            totalSessions = 15; // Monthly = 15 sessions
          } else if (lastPaidPackageName.includes("single")) {
            // Fallback for any single mention
            totalSessions = 1;
          } else {
            // Fallback to current package name if no payment history
            const currentPackageName = (pack.name || "").toLowerCase();
            if (currentPackageName.includes("single")) {
              totalSessions = 1;
            } else if (currentPackageName.includes("premium")) {
              totalSessions = 50;
            } else if (currentPackageName.includes("monthly")) {
              totalSessions = 15;
            }
          }
          
          // If sessionsRemaining is 0 or null but package is Active, 
          // assume all sessions are available (API data issue)
          const sessionsRemaining = pack.sessionsRemaining ?? totalSessions;
          
          return (
            <div className="p-6 border-b border-[#a1a1a1]">
              <ProgressBar
                current={sessionsRemaining}
                total={totalSessions}
              />
            </div>
          );
        })()}

        {/* Includes */}
        <div className="p-6">
          <span className="text-sm font-semibold text-[#a1a1a1] uppercase tracking-wider">
            Package Includes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {(packageFeatures || getRawPackageFeatures(pack.name || "")).map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2.5 text-md text-white">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Check size={16} className="text-primary" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
