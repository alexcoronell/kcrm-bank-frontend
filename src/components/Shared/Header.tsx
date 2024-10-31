import { Link } from "wouter";
import { Button } from "../ui/Button";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="Header flex p-2 items-center justify-between w-full shadow-md">
      <Logo />
      <div>
        <Link href="/login">
          <Button variant="primary">Iniciar sesión</Button>
        </Link>
        <Button variant="light">Cerrar sesión</Button>
      </div>
    </header>
  );
}
