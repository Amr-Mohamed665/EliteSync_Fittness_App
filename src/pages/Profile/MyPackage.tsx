import { Package, Check, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPackage } from "@/lib/Api/Authentication/profile";
type Package = {
    name: string;
    status: string;
    expires: string;
    total: number;
    remaining: number;
    icon: LucideIcon;
};

export default function MyPackage() {
    const [pkg] = useState<Package | null>({
        name: "Single Pack",
        status: "Active",
        expires: "May 31, 2026",
        total: 20,
        remaining: 12,
        icon: Package,
    });

    const features = [
        "1-on-1 Personal Training",
        "Customized Nutrition Plan",
        "Weekly Check-ins",
        "Access to Pro App Features",
    ];

    if (!pkg) return <p>Loading...</p>;
    const { data, isLoading } = useQuery({
    queryKey: ["profile-my-package"],
    queryFn: getMyPackage,
  });


    const completed = pkg.total - pkg.remaining;
    const progress = (completed / pkg.total) * 100;

    return (
        <div className="px-4 md:px-8 mt-10">
            <div className="border border-[#A7A7A7] rounded-2xl p-6 mt-6">
                <h2 className="text-3xl font-semibold mb-10">My Packages</h2>
                <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                    <div className="flex items-center gap-4">
                        <div>
                            <pkg.icon size={16} strokeWidth={0.7} className=" w-10 h-10" />
                        </div>
                        <div><h3 className="text-lg">{pkg.name}</h3>
                            <p className="text-gray-400 text-sm">
                                Expires on {pkg.expires}
                            </p>
                        </div>
                        <span className="bg-[#22C55E1A] text-[#22C55E] text-xs px-10 py-1 rounded-lg">
                            {pkg.status}
                        </span>
                    </div>
                    <button className="bg-[#FF4D4D] px-9 py-2.5 rounded-md tracking-tight text-xs font-bold hover:bg-black border border-[#FF4D4D] transition">
                        Upgrade Package {data?.upgradeOption}
                    </button>
                </div>
                <div className="mt-6 ">
                    <p className="text-xl">{pkg.remaining}</p>
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center text-lg font-light mb-2">
                        <p >
                            Sessions Remaining Out Of {pkg.total}
                        </p>
                        <span className="text-[#FF4D4D] ">
                            {completed} Completed
                        </span>
                    </div>
                    <div className="w-full bg-[#D9D9D9] h-2 rounded-full">
                        <div
                            className="bg-[#FF4D4D] h-2 rounded-full"
                            style={{ width: `${progress}%` }} />
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold text-2xl mb-3">Package Includes:</h3>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                        {features.map((f, i) => (
                            <p key={i} className=" flex items-center text-[#FFFFFF] text-2xl font-light">
                                <span className="text-[#FF4D4D]  mr-2"><Check size={19} /></span>
                                {f}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}