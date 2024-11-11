/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

/* Components */
import InputGroup from "./Shared/InputGroup";
import SwitchGroup from "./Shared/SwitchGroup";
import ButtonGroup from "./Shared/ButtonGroup";
import { RequestMessage } from "./ui/RequestMessage";

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

  const handleRateRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status: boolean = e as unknown as boolean
    if(status && franchiseRequired) setFranchiseRequired(false)
    setRateRequired(status)
  }

  const handleFranquiseRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status: boolean = e as unknown as boolean
    if(status && rateRequired) setRateRequired(false)
    setFranchiseRequired(status)
  }

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
            <InputGroup
              label="Ingresa el nombre"
              name={name}
              value={name}
              disabled={requestStatus === "loading"}
              readOnly={statusMode === "detail"}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              errorMessage="El nombre del tipo de usuario es obligatorio"
              errorStatus={errorName}
            />{" "}
          </div>

          <SwitchGroup
            label="Tasa requerida"
            name="rateRequired"
            checked={rateRequired}
            onCheckedChange={handleRateRequired}
            disabled={statusMode === "detail"}
          />

          <SwitchGroup
            label="Franquicia requerida"
            name="franchiseRequired"
            checked={franchiseRequired}
            onCheckedChange={handleFranquiseRequired}
            disabled={statusMode === "detail"}
          />

          {statusMode !== "create" && (
            <SwitchGroup
              label="Activar / Desactivar Producto"
              name="activateFranchise"
              checked={active}
              onCheckedChange={setActive}
              disabled={statusMode === "detail"}
            />
          )}

          <ButtonGroup
            statusMode={statusMode}
            changeEdit={changeEdit}
            cancel={cancel}
            url="/products"
          />
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
