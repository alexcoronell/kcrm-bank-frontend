import { useContext } from "react";
import { navigate } from "wouter/use-browser-location";

/* Components */
import { Button } from "../ui/Button";
import Logo from "../ui/Logo";

import { AppContext } from "../../context";

import AuthService from "../../core/services/auth.service";

export default function Header() {
  const context = useContext(AppContext);

  const logout = async () => {
    try {
      const res = await AuthService.logout();
      const { status } = res;
      if (status === 200) {
        context.logout();
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <header className="Header flex p-2 items-center justify-between w-full shadow-md">
      <Logo />
      <div className="flex gap-x-3 items-center">
        {context.isAuthenticated && (
          <>
            <p className="text-xs">Hola, {context.currentUser?.name}</p>
            <Button variant="light" onClick={logout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
