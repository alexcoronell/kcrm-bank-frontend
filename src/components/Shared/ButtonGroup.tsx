import { Button } from "../ui/Button";
import { Link } from "wouter";
import type { StatusMode } from "../../core/types/StatusMode.type";

interface Props {
  statusMode: StatusMode;
  changeEdit: () => void;
  cancel: () => void;
}

export default function ButtonGroup({ statusMode, changeEdit, cancel }: Props) {
  return (
    <div className="mx-auto max-w-xs my-6 grid grid-cols-2 gap-x-3">
      {statusMode === "detail" ? (
        <Button type="button" className="w-full" onClick={changeEdit}>
          Editar
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Guardar
        </Button>
      )}
      {statusMode === "edit" ? (
        <Button
          type="button"
          className="w-full"
          variant="light"
          onClick={cancel}
        >
          Cancelar
        </Button>
      ) : (
        <Link href="/franchises" className="w-full">
          <Button type="button" className="w-full" variant="light">
            Volver
          </Button>
        </Link>
      )}
    </div>
  );
}
