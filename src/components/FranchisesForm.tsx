import { useEffect, useState } from "react";

/* Components */
import InputGroup from "./Shared/InputGroup";
import ButtonGroup from "./Shared/ButtonGroup";
import SwitchGroup from "./Shared/SwitchGroup";
import { RequestMessage } from "./ui/RequestMessage";

/* Interfaces */
import type { Franchise } from "../core/interfaces/Franchise.interface";

/* DTO's */
import type {
  CreateFranchiseDto,
  UpdateFranchiseDto,
} from "../core/dtos/Franchise.dto";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";
import type { StatusMode } from "../core/types/StatusMode.type";

/* Services */
import FranchiseService from "../core/services/franchise.service";

interface Props {
  id: Franchise["id"] | null;
}

export default function FranchisesForm({ id }: Props) {
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("failed");
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const get = async () => {
    setRequestStatus("loading");
    try {
      const { data } = await FranchiseService.get(id as number);
      const { name, active } = data;
      setName(name);
      setActive(active);
      setRequestStatus("success");
    } catch (err) {
      setRequestStatus("failed");
      setShowRequestMessage(true);

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = err as any;
      if (status === 404) {
        setRequestMessage("La Franquicia solicitada no existe");
      } else if (status === 500) {
        setRequestMessage(
          "No se pudo descargar la información, intente más tarde"
        );
      }
    } finally {
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (id) {
      get();
      setStatusMode("detail");
    }
  }, [id]);

  const validateName = () => {
    if (name.length === 0) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const cancel = () => {
    clean();
    get();
    setStatusMode("detail");
  };

  const changeEdit = () => {
    setTimeout(() => {
      setStatusMode("edit");
    }, 50);
  };

  const clean = () => {
    setErrorName(false);
    setActive(false);
    setName("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    validateName();
    if (errorName || statusMode === "detail") return;
    try {
      if (statusMode === "create") {
        const franquise: CreateFranchiseDto = {
          name,
        };
        await FranchiseService.save(franquise);
        setRequestMessage("Franquicia guardada correctamente");
        clean();
      } else {
        const franquise: UpdateFranchiseDto = {
          name,
          active,
        };
        await FranchiseService.update(id as number, franquise);
        setRequestMessage("Franquicia actualizada correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = e as any;
      if (status === 409) {
        setRequestMessage("Franquicia ya existe en nuestros registros");
      } else {
        setRequestMessage("Franquicia no pudo ser guardada");
      }
      setRequestStatus("failed");
    } finally {
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-xs space-y-2 my-6">
            <InputGroup
              label="Ingresa el nombre"
              name="name"
              value={name}
              disabled={requestStatus === "loading"}
              readOnly={statusMode === "detail"}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              errorMessage="El nombre de la franquicia es obligatorio"
              errorStatus={errorName}
            />
          </div>

          {statusMode !== "create" && (
            <SwitchGroup label="Activar / Desactivar Franquicia" name="activeFranchise" checked={active} onCheckedChange={setActive} disabled={statusMode === "detail"} />
          )}

          <ButtonGroup
            statusMode={statusMode}
            changeEdit={changeEdit}
            cancel={cancel}
          />
        </form>
      </div>
      <RequestMessage
        message={requestMessage}
        status={requestStatus}
        showMessage={showRequestMessage}
      />
    </>
  );
}
