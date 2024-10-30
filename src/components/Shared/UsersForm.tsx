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
import SelectItemAlternative from "./SelectItemAlternative";
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
import { validateEmailHelper } from "../../core/helpers/validators.helper";

interface Props {
  id: UserType["id"] | null;
}

export default function UsersForm({ id }: Props) {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [requestStatusUserTypes, setRequestStatusUserTypes] =
    useState<RequestStatus>("init");

  const [name, setName] = useState<string>("");
  const [errorName, setErrorName] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<boolean>(false);
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] =
    useState<string>("");

  const [userTypeId, setUserTypeId] = useState<string | null>(null);
  const [errorUserTypeId, setErrorUserTypeId] = useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);
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
      setErrorEmailMessage("El correo electrónico es obligatorio");
      setErrorEmail(true);
    } else if (!validateEmailHelper(email)) {
      setErrorEmailMessage("El correo electrónico no es válido");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setErrorPassword(true);
      setErrorPasswordMessage(
        "La contraseña es requerida y debe tener al menos 20 caracteres"
      );
    } else if (password !== confirmPassword) {
      const message = "Las contraseñas no coinciden";
      setErrorEmailMessage(message);
      setErrorConfirmPasswordMessage(message);
      setErrorPasswordMessage(message);
      setErrorPassword(true);
      setErrorConfirmPassword(true);
    } else {
      setErrorPassword(false);
      setErrorConfirmPassword(false);
    }
  };

  const validateUserTypeId = () => {
    userTypeId === "" || !userTypeId
      ? setErrorUserTypeId(true)
      : setErrorUserTypeId(false);
  };

  const handleChangeUserType = (e: any) => {
    validateUserTypeId();
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
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserTypeId("");
    setErrorName(false);
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorConfirmPassword(false);
    setActive(false);
    setName("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    validateUserTypeId();
    if (
      errorName ||
      errorEmail ||
      errorPassword ||
      errorUserTypeId ||
      statusMode === "detail"
    )
      return;
    try {
      const userType = Number.parseInt(userTypeId as string);
      if (statusMode === "create") {
        console.log("save");
        const dto: CreateUserDto = {
          name,
          email,
          password,
          userType,
        };
        await UserService.save(dto);
        setRequestMessage("Usuario guardado correctamente");
        clean();
      } else {
        console.log("update");
        const dto: UpdateUserDto = {
          name,
          email,
          password,
          userType,
          active,
        };
        await UserService.update(id as number, dto);
        setRequestMessage("Usuario actualizado correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      setRequestStatus("failed");
      setRequestMessage("Usuario no pudo ser guardado");
    } finally {
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  return (
    <div className="UsersForm max-w-[800px] mx-auto">
      <form onSubmit={handleSubmit}>
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
              message={errorEmailMessage}
              errorStatus={errorEmail}
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
              message={errorPasswordMessage}
              errorStatus={errorPassword}
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
              message={errorConfirmPasswordMessage}
              errorStatus={errorConfirmPassword}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-3 md:items-center">
          <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
            <Label htmlFor="userTypeId">Tipo de Usuario</Label>{" "}
            <Select
              onValueChange={handleChangeUserType}
              value={userTypeId?.toString()}
            >
              {" "}
              <SelectTrigger id="userTypeId" className="mt-2">
                {" "}
                <SelectValue placeholder="Select" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {userTypes.length > 0 &&
                requestStatusUserTypes === "success" ? (
                  <>
                    {" "}
                    {userTypes.map((item, index) => (
                      <SelectItem key={index} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectItemAlternative
                    total={userTypes.length}
                    status={requestStatusUserTypes}
                  />
                )}
              </SelectContent>
            </Select>
            <ErrorInputMessage
              message={"El tipo de usuario es obligatorio"}
              errorStatus={errorUserTypeId}
            />
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
