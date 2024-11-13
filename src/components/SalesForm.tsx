
import { useEffect, useState, useContext } from "react";

/* Components */
import SelectGroup from "./Shared/SelectGroup";
import InputGroup from "./Shared/InputGroup";
import ButtonGroup from "./Shared/ButtonGroup";
import { ErrorInputMessage } from "./ui/ErrorInputMessage";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RequestMessage } from "./ui/RequestMessage";

/* Context */
import { AppContext } from "../context";

/* Interfaces */
import type { Sale } from "../core/interfaces/Sale.interface";
import type { Franchise } from "../core/interfaces/Franchise.interface";
import type { Product } from "../core/interfaces/Product.interface";

/* DTO's */
import type { CreateSaleDto, UpdateSaleDto } from "../core/dtos/Sale.dto";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";
import type { StatusMode } from "../core/types/StatusMode.type";

/* Services */
import SaleService from "../core/services/sale.service";
import FranchiseService from "../core/services/franchise.service";
import ProductService from "../core/services/product.service";
import type { User } from "../core/interfaces/User.interface";

interface Props {
  id: Sale["id"] | null;
}

export default function SalesForm({ id }: Props) {
  const context = useContext(AppContext);
  const [franchices, setFranchices] = useState<Franchise[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");

  const [requestStatusProducts, setRequestStatusProducts] =
    useState<RequestStatus>("init");
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [errorProduct, setErrorProduct] = useState(false);

  const [franchise, setFranchise] = useState<Franchise | null>(null);
  const [requestStatusFranchises, setRequestStatusFranchises] =
    useState<RequestStatus>("init");
  const [errorFranchise, setErrorFranchise] = useState(false);

  const [quotaRequested, setQuotaRequested] = useState(0);
  const [errorQuotaRequested, setErrorQuotaRequested] = useState(false);

  const [rate, setRate] = useState(0);
  const [errorRate, setErrorRate] = useState(false);

  useEffect(() => {
    getProducts();
    getFranchises();
  }, []);

  const getProducts = async () => {
    setRequestStatusProducts("loading");
    try {
      const {
        data: { items },
      } = await ProductService.getAll();
      setProducts(items);
      setRequestStatusProducts("success");
    } catch (e) {
      console.error(e);
      setRequestStatusProducts("failed");
    }
  };

  const getFranchises = async () => {
    setRequestStatusFranchises("loading");
    try {
      const {
        data: { items },
      } = await FranchiseService.getAll();
      setFranchices(items);
      setRequestStatusFranchises("success");
      console.log(items);
    } catch (e) {
      console.error(e);
      setRequestStatusFranchises("failed");
    }
  };

  const validateProduct = () => {
    if (product === null) {
      setErrorProduct(true);
    } else {
      setErrorProduct(false);
    }
  };

  const validateFranchise = () => {
    if (product?.franchiseRequired && franchise == null) {
      setErrorFranchise(true);
    } else {
      setErrorFranchise(false);
    }
  };

  const validateRate = () => {
    if ((product?.rateRequired && rate === 0) || rate === null) {
      setErrorRate(true);
    } else {
      setErrorRate(false);
    }
  };

  const validateQuotaRequested = () => {
    if (quotaRequested <= 100) {
      setErrorQuotaRequested(true);
    } else {
      setErrorQuotaRequested(false);
    }
  };

  const handleChangeProduct = (e: React.HTMLInputTypeAttribute) => {
    const id = Number.parseInt(e);
    const productId = products.findIndex((item) => item.id === id);
    setProduct(products[productId]);
    if (product?.franchiseRequired) setRate(0);
    if (product?.rateRequired) setFranchise(null);
  };

  const handleChangeFranchise = (e: React.HTMLInputTypeAttribute) => {
    const id = Number.parseInt(e);
    const franchiseId = franchices.findIndex((item) => item.id === id);
    setFranchise(franchices[franchiseId]);
  };

  const cancel = () => {
    clean();
    //get();
    setStatusMode("detail");
  };

  const changeEdit = () => {
    setTimeout(() => {
      setStatusMode("edit");
    }, 50);
  };

  const clean = () => {
    setProduct(null);
    setErrorProduct(false);

    setFranchise(null);
    setErrorFranchise(false);

    setRate(0);
    setErrorRate(false);

    setQuotaRequested(0);
    setErrorQuotaRequested(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    validateProduct();
    validateFranchise();
    validateRate();
    validateQuotaRequested()
    if (errorProduct || errorFranchise || errorRate || errorQuotaRequested)
      return;
    console.log("Seguí");
    setRequestStatus("loading");
    try {
      if (statusMode === "create") {
        const dto: CreateSaleDto = {
          product: product?.id as Product["id"],
          franchise: product?.franchiseRequired
            ? (franchise?.id as number)
            : null,
          rate: product?.rateRequired ? rate : null,
          quotaRequested,
          createdBy: context?.currentUser?.id as User["id"],
        };
        await SaleService.save(dto);
        setRequestMessage("La venta fue salvada correctamente");
        clean();
      } else {
        const dto: UpdateSaleDto = {
          product: product?.id as Product["id"],
          franchise: product?.franchiseRequired
            ? (franchise?.id as number)
            : null,
          rate: product?.rateRequired ? rate : null,
          quotaRequested,
          updatedBy: context?.currentUser?.id as User["id"],
        };
        await SaleService.update(id as number, dto);
        setRequestMessage("La venta fue actualizada correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      console.error(e);
      setRequestMessage("La vemta no pudo ser salvada");
      setRequestStatus("failed");
    } finally {
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 5000);
    }
  };

  return (
    <>
      <div className="SalesForm max-w-[800px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-2 md:gap-x-3">
            {/* Products */}
            <SelectGroup
              label="Producto"
              name="product"
              onValueChange={handleChangeProduct}
              value={product?.id.toString() as string}
              items={products}
              itemsRequestStatus={requestStatusProducts}
              errorMessage="El producto es requerido"
              errorStatus={errorProduct}
              onBlur={validateProduct}
            />

            {/* Franchises */}
            {product?.franchiseRequired && (
              <SelectGroup
                label="Franquicia"
                name="franchise"
                onValueChange={handleChangeFranchise}
                value={franchise?.id.toString() as string}
                items={franchices}
                itemsRequestStatus={requestStatusFranchises}
                errorMessage="La fraquicia es requerida"
                errorStatus={errorFranchise}
                onBlur={validateFranchise}
              />
            )}

            {/* Rate */}
            {product?.rateRequired && (
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                <InputGroup
                  label="Tasa"
                  name="rate"
                  type="number"
                  value={rate.toString()}
                  disabled={requestStatus === "loading"}
                  readOnly={statusMode === "detail"}
                  onChange={(e) => setRate(Number.parseInt(e.target.value))}
                  onBlur={validateRate}
                  errorStatus={errorRate}
                  errorMessage="La Tasa es requerida"
                />
              </div>
            )}

            {/* Disabled */}
            {!product && (
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                {" "}
                <Label htmlFor="noneInput" className="opacity-0">
                  noneInput
                </Label>{" "}
                <Input id="noneInput" name="noneInput" type="text" disabled />{" "}
              </div>
            )}
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-3">
            {/* Quota Requested */}
            <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
              <InputGroup
                label="Cupo Solicitado"
                name="quotaRequested"
                type="number"
                value={quotaRequested.toString()}
                disabled={requestStatus === "loading"}
                readOnly={statusMode === "detail"}
                onChange={(e) => setQuotaRequested(Number.parseInt(e.target.value))}
                onBlur={validateQuotaRequested}
                errorMessage={"El cupo solicitado es obligatorio"}
                errorStatus={errorQuotaRequested}
              />
            </div>
            {/* Current User */}
            <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
              {" "}
              <Label htmlFor="currentUser">Creado por</Label>{" "}
              <Input
                id="currentUser"
                name="currentUser"
                type="text"
                value={context.currentUser?.name}
                readOnly
              />{" "}
              <ErrorInputMessage
                errorMessage={"Error, no se ha cargado el usuario actual"}
                errorStatus={!context.currentUser}
              />
            </div>
          </div>

          <ButtonGroup
            statusMode={statusMode}
            changeEdit={changeEdit}
            cancel={cancel}
            url="/sales"
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
