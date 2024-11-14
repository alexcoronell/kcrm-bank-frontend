/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { navigate } from "wouter/use-browser-location";
import { useLocation } from "wouter";
import type { User } from "../core/interfaces/User.interface";
import AuthService from "../core/services/auth.service";

export const AppContext = createContext<{
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoadingSession: boolean;
  confirmDeleteMessage: boolean;
  itemToDelete: number | null;
  login: (user: User, isAdmin: boolean) => void;
  logout: () => void;
  showConfirmDeleteMessage: (id: number) => void;
  hideConfirmDeleteMessage: () => void;
}>({
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoadingSession: false,
  confirmDeleteMessage: false,
  itemToDelete: null,
  login: () => {},
  logout: () => {},
  showConfirmDeleteMessage: () => {},
  hideConfirmDeleteMessage: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const AppProvider = ({ children }: Props) => {
  const [location] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const login = (user: User, isAdmin: boolean) => {
    setCurrentUser(user);
    setIsAdmin(isAdmin);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  const showConfirmDeleteMessage = (id: number) => {
    setItemToDelete(id);
    setConfirmDeleteMessage(true);
  };

  const hideConfirmDeleteMessage = () => {
    setItemToDelete(null);
    setConfirmDeleteMessage(false);
  };

  const verifySession = async () => {
    setIsLoadingSession(true);
    try {
      const res = await AuthService.verifySession();
      const {
        data: { isAdmin, user },
      } = await res;
      login(user, isAdmin);
      if (location === "/login" || location === "/" || location === "")
        navigate("/dashboard");
    } catch (e) {
      console.error(e);
      logout();
      navigate("/login");
    } finally {
      setIsLoadingSession(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    verifySession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        isLoadingSession,
        confirmDeleteMessage,
        itemToDelete,
        showConfirmDeleteMessage,
        login,
        logout,
        hideConfirmDeleteMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
