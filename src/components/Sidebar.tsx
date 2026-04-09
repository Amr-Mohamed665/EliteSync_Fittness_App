import { NavLink } from "react-router-dom";
import { BellIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { PhoneIcon } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { FormIcon } from "lucide-react";
import { User2Icon } from "lucide-react";
import { forwardRef } from "react";

interface SidebarProps {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

// Home
// Trainers
// Packages
// Contact
// notifications
// profile

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ openSideBar }, ref) => {
  return (
    <div
      ref={ref}
      className={`${openSideBar ? "translate-x-0" : "translate-x-full"}  flex flex-col gap-3 p-2 md:hidden transform transition-transform duration-300 fixed top-16 right-0 bottom-0 w-60 bg-gray-950`}
    >
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/"}
      >
        <HomeIcon />
        <p>Home</p>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/trainers"}
      >
        <UsersIcon />Trainers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/packages"}
      >
        <FormIcon/>Packages
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/contact"}
      >
        <PhoneIcon/>Contact
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/profile"}
      >
        <User2Icon/>profile
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-2 p-1 rounded-md ${
            isActive
              ? "text-orange bg-orange-600/20"
              : "text-gray-200 font-medium"
          }`
        }
        to={"/notifications"}
      >
        <BellIcon/>notifications
      </NavLink>

      <h2 className=" text-center mt-auto pb-9 ">Let's achieve our goals together</h2>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
