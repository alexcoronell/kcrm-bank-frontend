import { createContext, useState } from "react";
import type { User } from "../core/interfaces/User.interface";

export const AppContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}>({
  currentUser: null,
  setCurrentUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const AppProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
