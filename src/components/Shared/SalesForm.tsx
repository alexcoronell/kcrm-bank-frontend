import { useEffect, useState, useContext } from "react";
import { Link } from "wouter";

import { Button } from "../ui/Button";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { RequestMessage } from "../ui/RequestMessage";

/* Components */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Switch } from "../ui/Switch";
import SelectItemAlternative from "./SelectItemAlternative";

/* Context */
import { AppContext } from "../../context";

/* Interfaces */
import { Sale } from "../../core/interfaces/Sale.interface";
import type { Franchise } from "../../core/interfaces/Franchise.interface";
import type { Product } from "../../core/interfaces/Product.interface";

/* DTO's */
import { CreateSaleDto, UpdateSaleDto } from "../../core/dtos/Sale.dto";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";
import type { StatusMode } from "../../core/types/StatusMode.type";

/* Services */
import SaleService from "../../core/services/sale.service";
import FranchiseService from "../../core/services/franchise.service";
import ProductService from "../../core/services/product.service";
import { RiCloseLargeFill } from "@remixicon/react";

export default function SalesForm() {
  const context = useContext(AppContext);
  const [franchices, setFranchices] = useState<Franchise[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [requestStatusProducts, setRequestStatusProducts] =
    useState<RequestStatus>("init");
  const [requestStatusFranchises, setRequestStatusFranchises] =
    useState<RequestStatus>("init");
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [errorProduct, setErrorProduct] = useState(false);

  const [franchise, setFranchise] = useState<Franchise | null>(null);
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

  const validateRate = () => {};

  const handleChangeProduct = (e: React.HTMLInputTypeAttribute) => {
    const id = Number.parseInt(e);
    const productId = products.findIndex((item) => item.id === id);
    setProduct(products[productId]);
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

  return (
    <>
      <div className="SalesForm max-w-[800px] mx-auto">
        <form>
          <div className="md:grid md:grid-cols-2 md:gap-x-3">
            {/* Products */}
            <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
              <Label htmlFor="roleId">Producto</Label>{" "}
              <Select
                onValueChange={handleChangeProduct}
                value={product?.id.toString()}
              >
                {" "}
                <SelectTrigger id="product" className="mt-2">
                  {" "}
                  <SelectValue placeholder="Select" />{" "}
                </SelectTrigger>{" "}
                <SelectContent>
                  {products.length > 0 &&
                  requestStatusProducts === "success" ? (
                    <>
                      {" "}
                      {products.map((item, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <SelectItem key={index} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <SelectItemAlternative
                      total={products.length}
                      status={requestStatusProducts}
                    />
                  )}
                </SelectContent>
              </Select>
              <ErrorInputMessage
                message={"El Producto es obligatorio"}
                errorStatus={errorProduct}
              />
            </div>

            {/* Franchises */}
            {product?.franchiseRequired && (
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                <Label htmlFor="roleId">Franquicia</Label>{" "}
                <Select
                  onValueChange={handleChangeFranchise}
                  value={franchise?.id.toString()}
                >
                  {" "}
                  <SelectTrigger id="product" className="mt-2">
                    {" "}
                    <SelectValue placeholder="Select" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {franchices.length > 0 &&
                    requestStatusFranchises === "success" ? (
                      <>
                        {" "}
                        {franchices.map((item, index) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <SelectItem key={index} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </>
                    ) : (
                      <SelectItemAlternative
                        total={franchices.length}
                        status={requestStatusFranchises}
                      />
                    )}
                  </SelectContent>
                </Select>
                <ErrorInputMessage
                  message={"La Franquicia es obligatoria"}
                  errorStatus={errorFranchise}
                />
              </div>
            )}

            {/* Rate */}
            {product?.rateRequired && (
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                {" "}
                <Label htmlFor="rate">Tasa</Label>{" "}
                <Input
                  placeholder="Ingresa la tasa"
                  id="rate"
                  name="rate"
                  type="number"
                  value={rate}
                  disabled={requestStatus === "loading"}
                  readOnly={statusMode === "detail"}
                  onChange={(e) => setRate(Number.parseInt(e.target.value))}
                  onBlur={validateRate}
                />{" "}
                <ErrorInputMessage
                  message={"La tasa es obligatoria"}
                  errorStatus={errorRate}
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
              {" "}
              <Label htmlFor="quotaRequested">Cupo solicitado</Label>{" "}
              <Input
                placeholder="Ingresa el cupo solicitado"
                id="quotaRequested"
                name="quotaRequested"
                type="number"
                value={rate}
                disabled={requestStatus === "loading"}
                readOnly={statusMode === "detail"}
                onChange={(e) => setRate(Number.parseInt(e.target.value))}
                onBlur={validateRate}
              />{" "}
              <ErrorInputMessage
                message={"El cupo solicitado es obligatorio"}
                errorStatus={errorQuotaRequested}
              />
            </div>
            {/* Quota Requested */}
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
                message={"Error, no se ha cargado el usuario actual"}
                errorStatus={!context.currentUser}
              />
            </div>
          </div>

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
              <Link href="/sales" className="w-full">
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
