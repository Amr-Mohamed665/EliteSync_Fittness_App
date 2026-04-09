import { CalendarCheck2, Package, Clock, LogOut, type LucideIcon } from "lucide-react";
import React from "react";
import Profile from "@/assets/Profile.jpg";
import { useQuery } from "@tanstack/react-query";
import { getProfileHeader } from "@/lib/Api/Authentication/profile";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";
import { useNavigate } from "react-router-dom";

type Card = {
    icon: LucideIcon;
    title: string;
    value: string | number;
};

const ProfileHeader: React.FC = () => {
    const { setIsLogedIn } = useAuth();
    const navigate = useNavigate();
    const { data: headerData } = useQuery({
        queryKey: ["profile-header"],
        queryFn: getProfileHeader,
    });

    const cards: Card[] = [
        { 
            icon: CalendarCheck2, 
            title: "Sessions Done", 
            value: headerData?.sessionsCompleted ?? 0 
        },
        { 
            icon: Package, 
            title: "Active Package", 
            value: headerData?.activePackage || "No Package" 
        },
        { 
            icon: Clock, 
            title: "Next Session", 
            value: headerData?.nextSession || "N/A" 
        },
    ];

    return (
        <div className="w-full  text-white p-4 md:p-8">
            <div className="flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center gap-10 mb-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                    <div className="relative group">
                        <img
                            src={headerData?.image || Profile}
                            className="w-24 h-24 rounded-full border-4 border-primary shadow-xl transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-slow" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="bg-primary px-4 py-2 rounded-xl shadow-lg mb-2">
                             <h2 className="text-xl sm:text-2xl md:text-3xl tracking-wide font-extrabold text-white">
                                {headerData?.name || "User"}
                            </h2>
                        </div>
                        <p className="font-semibold text-primary/80 tracking-widest text-[10px] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            Member since {headerData?.memberSince || "2024"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            setIsLogedIn(false);
                            navigate("/login");
                        }}
                        className="border border-[#FF4D4D] px-4 md:px-8 py-2.5 bg-[#121212] rounded-md text-sm hover:bg-red-500 transition flex items-center gap-2 whitespace-nowrap"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 ">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="group flex items-center gap-5 border border-white/10 rounded-2xl p-5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/30">
                                <Icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-bold mb-1">
                                    {card.title}
                                </p>
                                <h3 className="text-xl font-black text-white truncate leading-tight">
                                    {card.value}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default ProfileHeader;