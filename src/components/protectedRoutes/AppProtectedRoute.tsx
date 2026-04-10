interface RouteProps {
  children: React.ReactNode;
}
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";

function AppProtectedRoute({ children }: RouteProps) {
  const { isLogedIn } = useAuth();
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  const token = match ? match[2] : null;
  
  console.log("AppProtectedRoute - isLogedIn:", isLogedIn, "token exists:", !!token);
  
  return isLogedIn || token ? children : <Navigate to={"/login"} />;
}

export default AppProtectedRoute;
