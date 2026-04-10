import { Outlet } from "react-router-dom";
import SideBar from "@/components/common/SideBar/SideBar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userAvatar from "@/assets/user2.jpg";
import { menuItems } from "@/lib/constants/Profile/SideBar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/Api/Authentication/profile";
import useUserPackage from "@/hooks/useUserPackage";

function MobileSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { lastSuccessfulPackage, isLoading: packageLoading } = useUserPackage();

  const handleLogout = () => {
    logout();
    navigate("/auth/signup");
  };

  return (
    <aside className="w-full flex flex-col h-full">
      {/* User Header */}
      <div className="relative bg-orange px-6 pt-6 pb-8">
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
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-orange rounded-full" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-tight">
              {isLoading ? "..." : profileData?.name || "User"}
            </p>
            <span className="text-xs text-white/80 mt-0.5 block font-bold">
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

      <div className="h-4 bg-orange relative">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-950 rounded-t-2xl" />
      </div>

      <nav className="flex-1 px-3 pb-3 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pt-1 pb-2">
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
                  ? "bg-orange text-white shadow-md shadow-orange/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isActive
                    ? "bg-white/15"
                    : "bg-gray-800 group-hover:bg-gray-700"
                }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-red-900/20 flex items-center justify-center transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </div>
          Log Out
        </button>
      </div>
    </aside>
  );
}

function ProfileLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-auto flex flex-col lg:flex-row max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-24 mb-24 gap-x-8 relative">
      {/* Desktop Sidebar */}
      <div className="sticky top-28 h-fit hidden lg:block w-[300px] shrink-0">
        <SideBar />
      </div>

      {/* Mobile Drawer Trigger */}
      <div className={`lg:hidden fixed top-16 right-4 z-50 transition-all duration-300 ${
        isScrolled ? "opacity-0 scale-90 pointer-events-none" : "opacity-90 scale-100"
      }`}>
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3.5 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
              <Menu className="w-4 h-4" />
              <span className="text-[11px] font-bold tracking-wider uppercase">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-12 border-r-border/50 w-[300px] bg-gray-950 overflow-hidden">
            <SheetTitle className="sr-only">Profile Navigation</SheetTitle>
            <SheetDescription className="sr-only">Access your profile sections including personal info, sessions, and packages.</SheetDescription>
            <div className="h-full overflow-y-auto">
              <MobileSideBar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 min-w-0">
        <div className="lg:bg-card/20 lg:rounded-3xl lg:border lg:border-border/50 overflow-hidden lg:backdrop-blur-xs">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
