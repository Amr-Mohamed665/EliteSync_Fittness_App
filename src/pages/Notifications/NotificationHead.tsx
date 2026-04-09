import { useState } from "react";
import { Bell, CheckCheck, Search } from "lucide-react";
export default function Notification() {
    const [count] = useState(4);

    return (
        <div className="w-full  text-white p-4 md:p-8">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl flex items-center gap-2 font-semibold"> <Bell size={20} />Notifications</h1>
                    <p className="text-[#E8E8E8] text-sm font-extralight ">
                        (You have {count} unread notifications)
                        <span className="text-[#FF4D4D] ml-1">•</span>
                    </p>
                </div>

                <button className="flex items-center gap-2 border border-[#FF4D4D] px-3 py-1 rounded-lg text-sm">
                    <CheckCheck size={16} />Mark all as read
                </button>
            </div>
            <div className="relative mt-4">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    placeholder="Search..."
                    className="w-full pl-10 pr-3 py-2 border border-[#E8E8E8] rounded-lg bg-transparent outline-none"
                />
            </div>
        </div>
    );
}