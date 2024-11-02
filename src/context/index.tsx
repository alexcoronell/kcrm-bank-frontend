import { createContext, useState } from "react";
import type { User } from "../core/interfaces/User.interface";

export const AppContext = createContext<{
    currentUser: User | null;
    setCurrentUser: (user:  User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (authenticated: boolean) => void;
}>({
    currentUser: null,
    setCurrentUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

interface Props {
	children: React.ReactNode;
}
export const AppProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AppContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				isAuthenticated,
				setIsAuthenticated,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
