import { useEffect, useState } from "react";
import { Link } from "wouter";

import { Button } from "../ui/Button";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
/* Components */
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { RequestMessage } from "../ui/RequestMessage";
import { Switch } from "../ui/Switch";

/* Interfaces */
import type { Role } from "../../core/interfaces/Role.interface";

/* DTO's */
import type { CreateRoleDto, UpdateRoleDto } from "../../core/dtos/Role.dto";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";
import type { StatusMode } from "../../core/types/StatusMode.type";

/* Services */
import RoleService from "../../core/services/Role.service";

interface Props {
  id: Role["id"] | null;
}

export default function RoleForm({ id }: Props) {
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [name, setName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const get = async (id: Role["id"]) => {
    setRequestStatus("loading");
    try {
      const { data } = await RoleService.get(id as number);
      const { name, isAdmin, active } = data;
      setName(name);
      setIsAdmin(isAdmin);
      setActive(active);
      setRequestStatus("success");
    } catch (err) {
      setShowRequestMessage(true);
      setRequestStatus("failed");
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = err as any;
      if (status === 404) {
        setRequestMessage("El rol solicitado no existe");
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
      get(id);
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
    get(id as number);
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
    setIsAdmin(false);
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
        const dto: CreateRoleDto = {
          name,
          isAdmin,
        };
        await RoleService.save(dto);
        setRequestMessage("Rol guardado correctamente");
        clean();
      } else {
        const dto: UpdateRoleDto = {
          name,
          isAdmin,
          active,
        };
        await RoleService.update(id as number, dto);
        setRequestMessage("Rol actualizado correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = e as any;
      if (status === 409) {
        setRequestMessage("Rol ya existe en nuestros registros");
      } else {
        setRequestMessage("Rol no pudo ser guardado");
      }
      setRequestStatus("failed");
    } finally {
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 5000);
    }
  };

  return (
    <>
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
              readOnly={statusMode === "detail"}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
            />{" "}
            <ErrorInputMessage
              message="El nombre del Rol es obligatorio"
              errorStatus={errorName}
            />
          </div>

          <div className="flex items-center justify-center gap-2 my-6 md:py-3">
            {" "}
            <Switch
              id="isAdmin"
              checked={isAdmin}
              onCheckedChange={setIsAdmin}
              disabled={statusMode === "detail"}
            />{" "}
            <Label htmlFor="activateUser">
              Establecer usuario administrativo
            </Label>{" "}
          </div>

          {statusMode !== "create" && (
            <div className="flex items-center justify-center gap-2 my-6 md:py-3">
              {" "}
              <Switch
                id="activateUser"
                checked={active}
                onCheckedChange={setActive}
                disabled={statusMode === "detail"}
              />{" "}
              <Label htmlFor="activateUser">Activar / Desactivar Role</Label>{" "}
            </div>
          )}

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
              <Link href="/roles" className="w-full">
                <Button type="button" className="w-full" variant="light">
                  Volver
                </Button>
              </Link>
            )}
          </div>
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
