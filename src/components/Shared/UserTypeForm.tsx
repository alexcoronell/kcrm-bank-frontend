import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";

export default function UserTypeForm() {
  return (
    <div>
      <form>
        <div className="mx-auto max-w-xs space-y-2 my-6">
          {" "}
          <Label htmlFor="name">Ingresa el nombre</Label>{" "}
          <Input
            placeholder="Ingresa el nombre"
            id="name"
            name="name"
            type="text"
          />{" "}
        </div>

        <div className="flex items-center justify-center gap-2 my-6 md:py-3">
          {" "}
          <Switch id="activateUser" />{" "}
          <Label htmlFor="activateUser">Activar / Desactivar Tipo de Usuario</Label>{" "}
        </div>

        <div className="mx-auto max-w-xs my-6 flex items-center justify-center gap-x-3">
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
          <Button type="button" className="w-full" variant="light">
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
}
