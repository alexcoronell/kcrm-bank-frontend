import { useState, useEffect } from "react";
import { Link } from "wouter";

/* Components */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
import { RequestMessage } from "../ui/RequestMessage";

/* Interfaces */
import { User } from "../../core/interfaces/User.interface";
import { UserType } from "../../core/interfaces/UserType.interface";

/* DTO's */
import { CreateUserDto, UpdateUserDto } from "../../core/dtos/User.dto";

/* Types */
import { RequestStatus } from "../../core/types/RequestStatus.type";
import { StatusMode } from "../../core/types/StatusMode.type";

/* Services */
import UserService from "../../core/services/user.service";
import UserTypeService from "../../core/services/userType.service";

/* Helpers */
import { validateEmailHelper } from "../../helpers/validators.helper";
import SelectItemAlternative from "./SelectItemAlternative";

interface Props {
  id: UserType["id"] | null;
}

export default function UsersForm({ id }: Props) {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [userTypeId, setUserTypeId] = useState<string | null>(null);
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [requestStatusUserTypes, setRequestStatusUserTypes] =
    useState<RequestStatus>("init");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

  /**
   * Fetch Item's data
   */
  const get = async () => {
    setRequestStatus("loading");
    try {
      const { data } = await UserService.get(id as number);
      const { name, email, active, userType } = data;
      setName(name);
      setEmail(email);
      setIsAdmin(isAdmin);
      setUserTypeId(userType.id as string);
      setActive(active);
      setRequestStatus("success");
    } catch (err) {
      setShowRequestMessage(true);
      setRequestStatus("failed");
      const { status } = err as any;
      if (status === 404) {
        setRequestMessage("El usuario solicitado no existe");
      } else if (status === 500) {
        setRequestMessage(
          "No se pudo descargar la información, intente más tarde"
        );
      }
    } finally {
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  const getUserTypes = async () => {
    setRequestStatusUserTypes("loading");
    try {
      const { data } = await UserTypeService.getAllSimple();
      setUserTypes(data);
      setRequestStatusUserTypes("success");
    } catch (err) {
      setRequestStatusUserTypes("failed");
    }
  };

  useEffect(() => {
    getUserTypes();
  }, []);

  useEffect(() => {
    if (id) {
      //get();
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

  const validateEmail = () => {
    if (email.length === 0 || !email) {
      setEmailErrorMessage("El correo electrónico es obligatorio");
      setEmailError(true);
    } else if (!validateEmailHelper(email)) {
      setEmailErrorMessage("El correo electrónico no es válido");
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = () => {
    if (password.length < 20) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "La contraseña es requerida y debe tener al menos 20 caracteres"
      );
    } else if (password !== confirmPassword) {
      const message = "Las contraseñas no coinciden";
      setPasswordErrorMessage(message);
      setConfirmPasswordErrorMessage(message);
      setPasswordError(true);
      setConfirmPasswordError(true);
    } else {
      setPasswordError(false);
      setConfirmPasswordError(false);
    }
  };

  const handleChangeUserType = (e: any) => {
    console.log(e);
    setUserTypeId(e);
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
    setIsAdmin(false);
    setName("");
  };

  return (
    <div className="UsersForm max-w-[800px] mx-auto">
      <form>
        <div className="md:grid md:grid-cols-2 md:gap-x-3">
          {/* Name */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="name">Nombre</Label>{" "}
            <Input
              placeholder="Ingresa tu nombre"
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
              message={"El nombre del usuario es obligatorio"}
              errorStatus={errorName}
            />
          </div>

          {/* Email */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="email">Email</Label>{" "}
            <Input
              placeholder="Ingresa tu email"
              id="email"
              name="email"
              type="email"
              value={email}
              disabled={requestStatus === "loading"}
              readOnly={statusMode === "detail"}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />{" "}
            <ErrorInputMessage
              message={emailErrorMessage}
              errorStatus={emailError}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-3 ">
          {/* Password */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="password">Contraseña</Label>{" "}
            <Input
              name="password"
              id="password"
              placeholder="Ingresa la contraseña"
              type="password"
              value={password}
              disabled={requestStatus === "loading"}
              readOnly={statusMode === "detail"}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />{" "}
            <ErrorInputMessage
              message={passwordErrorMessage}
              errorStatus={passwordError}
            />
          </div>

          {/* Confirm Password */}
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            {" "}
            <Label htmlFor="confirm-password">
              Confirma tu contraseña
            </Label>{" "}
            <Input
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Ingresa nuevamente la contraseña"
              type="password"
              value={confirmPassword}
              disabled={requestStatus === "loading"}
              readOnly={statusMode === "detail"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validatePassword}
            />{" "}
            <ErrorInputMessage
              message={confirmPasswordErrorMessage}
              errorStatus={confirmPasswordError}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-3 md:items-center">
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            <Label htmlFor="userTypeId">Tipo de Usuario</Label>{" "}
            <Select
              onValueChange={handleChangeUserType}
              value={userTypeId as string}
            >
              {" "}
              <SelectTrigger id="userTypeId" className="mt-2">
                {" "}
                <SelectValue placeholder="Select" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                {userTypes.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id as unknown as string}
                  >
                    {" "}
                    {item.name}{" "}
                  </SelectItem>
                ))}{" "}
                <SelectItemAlternative
                  status={requestStatusUserTypes}
                  total={userTypes.length}
                />
              </SelectContent>{" "}
            </Select>
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
              <Label htmlFor="activateUser">Activar / Desactivar Usuario</Label>{" "}
            </div>
          )}
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
            <Link href="/users" className="w-full">
              <Button type="button" className="w-full" variant="light">
                Volver
              </Button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
