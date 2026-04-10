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
  // Check if token cookie exists
  const hasToken = document.cookie.split('; ').find(row => row.startsWith('token=')) !== undefined;
  
  const [isLogedIn, setIsLogedIn] = useState<boolean>(hasToken);

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
