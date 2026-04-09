interface RouteProps {
  children: React.ReactNode;
}

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthenticationCntext from "@/lib/Cntext/AuthenticationCntext";

function AuthenticationProtectedRoute({ children }: RouteProps) {
  let { isLogedIn } = useContext(AuthenticationCntext);
  const token = localStorage.getItem("token");
  return isLogedIn || token ? <Navigate to={"/"} /> : children;
}

export default AuthenticationProtectedRoute;
