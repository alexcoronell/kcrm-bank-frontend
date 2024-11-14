import { useContext } from "react";

import { Button } from "../ui/Button";

import { AppContext } from "../../context";

interface Props {
  message: string;
  onClick: () => void;
}

export default function ConfirmDeleteMessage({ message, onClick }: Props) {
  const context = useContext(AppContext);

  if (context.confirmDeleteMessage) {
    return (
      <div className="ConfirmDeleteMessage fixed top-0 bottom-0 left-0 right-0 bg-black/80 flex items-center justify-center">
        <div className="ConfirmDeleteMessage__box w-full max-w-[400px] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[250px] p-12 flex flex-col justify-around items-center gap-y-4">
          <p className="text-center">{message}</p>
          <div className="Confirm__box__buttons flex items-center justify-center gap-x-3">
            <Button onClick={onClick} variant="destructive">
              Eliminar
            </Button>
            <Button onClick={context.hideConfirmDeleteMessage} variant="light">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
