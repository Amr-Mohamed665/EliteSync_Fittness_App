interface RouteProps {
  children: React.ReactNode;
}
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/Cntext/AuthenticationCntext";

function AppProtectedRoute({ children }: RouteProps) {
  const { isLogedIn } = useAuth();
  const token = localStorage.getItem("token");
  
  console.log("AppProtectedRoute - isLogedIn:", isLogedIn, "token exists:", !!token);
  
  return isLogedIn || token ? children : <Navigate to={"/login"} />;
}

export default AppProtectedRoute;
