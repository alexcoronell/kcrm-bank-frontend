import { useState } from "react";

/* Components */
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
import { RequestMessage } from "../ui/RequestMessage";

/* DTO's */
import { CreateFranchiseDto } from "../../core/dtos/Franchise.dto";

/* Types */
import { RequestStatus } from "../../core/types/RequestStatus.type";

/* Services */
import FranchiseService from "../../core/services/franchise.service";

export default function FranchisesForm() {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("failed");
  const [name, setName] = useState<string>("");
  const [activate, setActivate] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const validateName = () => {
    if (name.length === 0) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const clean = () => {
    setErrorName(false);
    setActivate(false);
    setName("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    validateName();
    if (errorName) return;
    const franquise: CreateFranchiseDto = {
      name,
    };
    setRequestStatus("loading");
    const response: any = await FranchiseService.save(franquise);
    console.log(await response);
    if(response?.ok) {
      setRequestStatus("success");
      setRequestMessage("Franquicia guardada correctamente");
    } else {
      setRequestStatus("failed");
      setRequestMessage("Franquicia no pudo ser guardada");
    }
    setShowRequestMessage(true);
    setTimeout(() => setShowRequestMessage(false), 2000);
  };
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-xs space-y-2 my-6">
          {" "}
          <Label htmlFor="name">Ingresa el nombre</Label>{" "}
          <Input
            placeholder="Ingresa el nombre"
            id="name"
            name="name"
            type="text"
            value={name}
            disabled={requestStatus === "loading"}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
          />{" "}
          <ErrorInputMessage
            message="El nombre de la franquicia es obligatorio"
            errorStatus={errorName}
          />
        </div>

        <div className="flex items-center justify-center gap-2 my-6 md:py-3">
          {" "}
          <Switch id="activateUser" />{" "}
          <Label htmlFor="activateUser">Activar / Desactivar Franquicia</Label>{" "}
        </div>

        <div className="mx-auto max-w-xs my-6 flex items-center justify-center gap-x-3">
          <Button type="submit" className="w-full">
            Guardar
          </Button>
          <Button type="button" className="w-full" variant="light">
            Limpiar
          </Button>
        </div>
      </form>
      <RequestMessage
        message={requestMessage}
        status={requestStatus}
        showMessage={showRequestMessage}
      />
    </div>
  );
}
