import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";

export default function UsersForm() {
  const userType = [
    { id: 1, name: "Opcion 1" },
    { id: 2, name: "Opcion 2" },
    { id: 3, name: "Opcion 3" },
  ];
  return (
    <div className="UsersForm max-w-[800px] mx-auto">
      <form>
        <div className="md:grid md:grid-cols-2 md:gap-x-3">
          {/* Name */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="name">Nombre</Label>{" "}
            <Input
              placeholder="Ingresa tu nombre"
              id="name"
              name="name"
              type="text"
            />{" "}
          </div>

          {/* Email */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="email">Email</Label>{" "}
            <Input
              placeholder="Ingresa tu email"
              id="email"
              name="email"
              type="email"
            />{" "}
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-3 ">
          {/* Password */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="password">Contraseña</Label>{" "}
            <Input
              name="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              type="password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="confirm-password">
              Confirma tu contraseña
            </Label>{" "}
            <Input
              name="confirm-password"
              id="confirm-password"
              placeholder="Ingresa nuevamente tu contraseña"
              type="password"
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-3 md:items-center">
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            <Label htmlFor="size">Tipo de Usuario</Label>{" "}
            <Select>
              {" "}
              <SelectTrigger id="size" className="mt-2">
                {" "}
                <SelectValue placeholder="Select" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                {userType.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id as unknown as string}
                  >
                    {" "}
                    {item.name}{" "}
                  </SelectItem>
                ))}{" "}
              </SelectContent>{" "}
            </Select>
          </div>

          <div className="flex items-center justify-center gap-2 my-6 md:pt-9">
            {" "}
            <Switch id="activateUser" />{" "}
            <Label htmlFor="activateUser">Activar / Desactivar Usuario</Label>{" "}
          </div>
        </div>

        <div className="mx-auto max-w-xs mt-6 flex items-center justify-center gap-x-3">
          <Button className="w-full m-0">Guardar</Button>
          <Button className="w-full m-0" variant="light">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
