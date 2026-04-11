import { Link, useLocation, useNavigate } from "react-router-dom";
import userAvatar from "@/assets/user2.jpg";
import { menuItems } from "@/lib/constants/Profile/SideBar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";
import useUserPackage from "@/hooks/useUserPackage";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { lastSuccessfulPackage, isLoading: packageLoading } = useUserPackage();

  console.log("Sidebar profile data:", profileData);
  console.log("Sidebar profile_image:", profileData?.profile_image);

  const handleLogout = () => {
    logout();
    navigate("/auth/signup");
  };

  return (
    <aside className="w-full hidden lg:flex flex-col shrink-0 rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
      {/* User Header */}
      <div className="relative bg-primary px-6 pt-6 pb-8">
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
          <div>
            <p className="font-bold text-primary-foreground text-base leading-tight">
              {isLoading ? "..." : profileData?.name || "User"}
            </p>
            <span className="text-xs text-primary-foreground/60 mt-0.5 block font-bold">
              {packageLoading ? (
                "Loading..."
              ) : lastSuccessfulPackage ? (
                lastSuccessfulPackage.packageName
              ) : (
                "Premium"
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="h-4 bg-primary relative">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-card rounded-t-2xl" />
      </div>

      <nav className="flex-1 px-3 pb-3 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 pt-1 pb-2">
          Menu
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.label}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isActive
                    ? "bg-white/15"
                    : "bg-muted group-hover:bg-background"
                }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
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
