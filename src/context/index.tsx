import { createContext, useState } from "react";
import type { User } from "../core/interfaces/User.interface";

export const AppContext = createContext<{
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, isAdmin: boolean) => void;
  logout: () => void
}>({
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const AppProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (user: User, isAdmin: boolean) => {
    setCurrentUser(user)
    setIsAdmin(isAdmin)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAdmin(false)
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
