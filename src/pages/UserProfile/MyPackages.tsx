// MyPackages.tsx
import { Check, Package, ArrowUpRight } from "lucide-react";
import ProgressBar from "../../components/common/UserProfile/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyPackage } from "@/lib/Api/Authentication/profile";

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
                  {pack.name || "Package"}
                </span>
                <span
                  className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                    pack.status === "Active"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-gray-500/15 text-gray-400"
                  }`}>
                  {pack.status || "Active"}
                </span>
              </div>
              <span className="text-md text-[#a1a1a1] mt-0.5 block">
                Expires on {pack.expiryDate || "N/A"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:-translate-y-0.5 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer w-full sm:w-auto">
            Upgrade Package
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Progress */}
        <div className="p-6 border-b border-[#a1a1a1]">
          <ProgressBar
            current={pack.sessionsRemaining || 0}
            total={pack.totalSessions || 1}
          />
        </div>

        {/* Includes */}
        <div className="p-6">
          <span className="text-sm font-semibold text-[#a1a1a1] uppercase tracking-wider">
            Package Includes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {pack.includes?.map((feature) => (
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
