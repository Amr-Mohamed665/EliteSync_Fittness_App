interface RouteProps {
  children: React.ReactNode;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";

function AuthenticationProtectedRoute({ children }: RouteProps) {
  let { isLogedIn } = useAuth();
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  const token = match ? match[2] : null;
  return isLogedIn || token ? <Navigate to={"/"} /> : children;
}

export default AuthenticationProtectedRoute;
