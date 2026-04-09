import { Link, useLocation, useNavigate } from "react-router-dom";
import userAvatar from "@/assets/user2.jpg";
import { menuItems } from "@/lib/constants/Profile/SideBar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  console.log("Sidebar profile data:", profileData);
  console.log("Sidebar profile_image:", profileData?.profile_image);

  const handleLogout = () => {
    logout();
    navigate("/auth/signup");
  };

  return (
    <aside className="w-full flex flex-col shrink-0 bg-black rounded-2xl shadow-2xl overflow-hidden border border-border">
      {/* User Header */}
      <div className="relative bg-[#FF4D4D] px-6 pt-10 pb-8">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            {isLoading ? (
              <div className="w-16 h-16 rounded-2xl bg-white/20 animate-pulse" />
            ) : (
              <img
                src={profileData?.profile_image || userAvatar}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-lg"
              />
            )}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-primary rounded-full" />
          </div>
          <div className="flex flex-col bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{isLoading ? "..." : profileData?.name || "User"}</h3>
            <p className="text-[10px] text-white/90 font-medium">Premium Member</p>
          </div>
        </div>
      </div>

      <div className="h-4 bg-primary relative">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black rounded-t-2xl" />
      </div>

      <nav className="flex-1 px-3 pb-3 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 pt-1 pb-2">
          Menu
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.label}
              className={`group flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? "bg-white/15"
                    : "bg-muted group-hover:bg-background"
                }`}>
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <span className="flex-1 tracking-wide">{item.label}</span>
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-border">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-muted group-hover:bg-destructive/10 flex items-center justify-center transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </div>
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
