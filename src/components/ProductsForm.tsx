import { useEffect, useState } from "react";
import { Link } from "wouter";

import { Button } from "./ui/Button";
import { ErrorInputMessage } from "./ui/ErrorInputMessage";
/* Components */
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RequestMessage } from "./ui/RequestMessage";
import { Switch } from "./ui/Switch";

/* Interfaces */
import type { Product } from "../core/interfaces/Product.interface";

/* DTO's */
import type {
  CreateProductDto,
  UpdateProductDto,
} from "../core/dtos/Product.dto";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";
import type { StatusMode } from "../core/types/StatusMode.type";

/* Services */
import ProductService from "../core/services/product.service";

interface Props {
  id: Product["id"] | null;
}

export default function ProductsForm({ id }: Props) {
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("failed");
  const [name, setName] = useState<string>("");
  const [rateRequired, setRateRequired] = useState<boolean>(false);
  const [franchiseRequired, setFranchiseRequired] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const get = async () => {
    setRequestStatus("loading");
    try {
      const { data } = await ProductService.get(id as number);
      const { name, rateRequired, franchiseRequired, active } = data;
      setName(name);
      setRateRequired(rateRequired);
      setFranchiseRequired(franchiseRequired);
      setActive(active);
      setRequestStatus("success");
    } catch (err) {
      setShowRequestMessage(true);
      setRequestStatus("failed");

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = err as any;
      if (status === 404) {
        setRequestMessage("El product solicitado no existe");
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
    setRateRequired(false);
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
        const dto: CreateProductDto = {
          name,
          rateRequired,
          franchiseRequired,
        };
        await ProductService.save(dto);
        setRequestMessage("Producto guardado correctamente");
        clean();
      } else {
        const dto: UpdateProductDto = {
          name,
          rateRequired,
          franchiseRequired,
          active,
        };
        await ProductService.update(id as number, dto);
        setRequestMessage("Producto actualizado correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = e as any;
      if (status === 409) {
        setRequestMessage("Producto ya existe en nuestros registros");
      } else {
        setRequestMessage("Producto no pudo ser guardado");
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
              errorMessage="El nombre del tipo de usuario es obligatorio"
              errorStatus={errorName}
            />
          </div>

          <div className="flex items-center justify-center gap-2 my-6 md:py-3">
            {" "}
            <Switch
              id="rateRequired"
              checked={rateRequired}
              onCheckedChange={setRateRequired}
              disabled={statusMode === "detail"}
            />{" "}
            <Label htmlFor="rateRequired">Tasa requerida</Label>{" "}
          </div>

          <div className="flex items-center justify-center gap-2 my-6 md:py-3">
            {" "}
            <Switch
              id="rateRequired"
              checked={franchiseRequired}
              onCheckedChange={setFranchiseRequired}
              disabled={statusMode === "detail"}
            />{" "}
            <Label htmlFor="franchiseRequired">Franquicia requerida</Label>{" "}
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
              <Label htmlFor="activateUser">
                Activar / Desactivar Tipo de Usuario
              </Label>{" "}
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
              <Link href="/products" className="w-full">
                <Button type="button" className="w-full" variant="light">
                  Volver
                </Button>
              </Link>
            )}
          </div>
        </form>
        <RequestMessage
          message={requestMessage}
          status={requestStatus}
          showMessage={showRequestMessage}
        />
      </div>
    </>
  );
}
