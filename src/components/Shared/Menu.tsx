import { Link } from "wouter";

import { Button } from "../ui/Button";

export default function Menu() {
  return (
    <nav className="Menu flex flex-col gap-y-1 h-full">
      <Link href="/franchises">
        <Button className="w-[200px]" variant="secondary">
          Franquicias
        </Button>
      </Link>
      <Link href="/products">
        <Button className="w-[200px]" variant="secondary">
          Productos
        </Button>
      </Link>
      <Link href="/sales">
        <Button className="w-[200px]" variant="secondary">
          Ventas
        </Button>
      </Link>
      <Link href="/users">
        <Button className="w-[200px]" variant="secondary">
          Usuarios
        </Button>
      </Link>
      <Link href="/roles">
        <Button className="w-[200px]" variant="secondary">
          Roles
        </Button>
      </Link>
    </nav>
  );
}
