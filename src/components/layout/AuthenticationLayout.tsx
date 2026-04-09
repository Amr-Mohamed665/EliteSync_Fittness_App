import { Outlet } from "react-router-dom";
import gymbackground from "../../../public/gymbackground.png";
import "../../index.css";
import { useState } from "react";
import { AlertCoponant } from "@/components/common/Alart";
import { useEffect } from "react";

function AuthenticationLayout() {
  const [alrtEror, setalrtEror] = useState(null);

  useEffect(() => {
    if (alrtEror) {
      const timer = setTimeout(() => {
      setalrtEror(null); 
    }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [alrtEror]);

  return (
    <div
      style={{ backgroundImage: `url(${gymbackground})` }}
      className="relative w-full flex-col overflow-hidden overflow-x-hidden py-5 min-h-screen flex items-center justify-center bg-center bg-cover before:absolute before:inset-0 before:bg-black/50"
    >
      {alrtEror && <AlertCoponant isEror={true} title="Authentication Error" text={alrtEror} />}
      <Outlet context={{ setalrtEror }} />
    </div>
  );
}

export default AuthenticationLayout;
