import { Outlet } from "react-router-dom";
import SideBar from "@/components/common/SideBar/SideBar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

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
          <SheetContent side="left" className="p-0 pt-12 border-r-border/50 w-[300px] bg-black overflow-hidden">
            <SheetTitle className="sr-only">Profile Navigation</SheetTitle>
            <SheetDescription className="sr-only">Access your profile sections including personal info, sessions, and packages.</SheetDescription>
            <div className="h-full overflow-y-auto">
                <SideBar />
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
