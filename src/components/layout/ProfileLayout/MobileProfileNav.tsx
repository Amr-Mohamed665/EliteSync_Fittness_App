import { NavLink } from "react-router-dom";
import { menuItems } from "@/lib/constants/Profile/SideBar";

const MobileProfileNav = () => {
    return (
        <nav className="lg:hidden flex flex-col gap-1.5 mb-10 bg-card rounded-2xl border border-border p-3 shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-border mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Profile Navigation
                </p>
            </div>
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive 
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                            : "text-muted-foreground hover:bg-muted"
                        }`
                    }
                >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                        window.location.pathname === item.path ? "bg-white/10" : "bg-muted group-hover:bg-background"
                    }`}>
                        <item.icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default MobileProfileNav;
