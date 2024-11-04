import { useContext } from "react";
import { Link } from "wouter";
import { Button } from "../ui/Button";
import Logo from "../ui/Logo";

import { AppContext } from "../../context";

export default function Header() {
  const context = useContext(AppContext)
  return (
    <header className="Header flex p-2 items-center justify-between w-full shadow-md">
      <Logo />
      <div>
        Hola, { context.currentUser?.name }
        <Link href="/login">
          <Button variant="primary">Iniciar sesión</Button>
        </Link>
        <Button variant="light">Cerrar sesión</Button>
      </div>
    </header>
  );
}
