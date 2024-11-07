import { useContext } from "react";
import { AppContext } from "../../context";
import { Button } from "../ui/Button";

export default function ConfirmDeleteMessage() {
  const context = useContext(AppContext);
  if (context.showConfirmMessage) {
    return (
      <div className="ConfirmDeleteMessage fixed top-0 bottom-0 left-0 right-0 bg-black/80 flex items-center justify-center">
        <div className="ConfirmDeleteMessage__box w-full max-w-[400px] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[250px] p-12 flex flex-col justify-around items-center gap-y-4">
          <p className="text-center">Esta usted seguro de eliminar esta franquicia</p>
          <div className="Confirm__box__buttons flex items-center justify-center gap-x-3">
          <Button variant="destructive">Eliminar</Button>
          <Button variant="light">Cancelar</Button>
          </div>
        </div>
      </div>
    );
  }
}
