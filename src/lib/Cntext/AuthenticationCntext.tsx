import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthenticationCntext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthenticationCntextProvider({ children }: AuthProviderProps) {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("token") != null,
  );

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogedIn(false);
  };

  return (
    <AuthenticationCntext.Provider value={{ isLogedIn, setIsLogedIn, logout }}>
      {children}
    </AuthenticationCntext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthenticationCntext);
  if (!context) {
    throw new Error("useAuth must be used within AuthenticationCntextProvider");
  }
  return context;
}

export default AuthenticationCntext;
