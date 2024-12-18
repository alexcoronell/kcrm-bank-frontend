import { useEffect, useState } from "react";

/* Components */
import InputGroup from "./Shared/InputGroup";
import SelectGroup from "./Shared/SelectGroup";
import SwitchGroup from "./Shared/SwitchGroup";
import ButtonGroup from "./Shared/ButtonGroup";
import { RequestMessage } from "./ui/RequestMessage";

/* Interfaces */
import type { User } from "../core/interfaces/User.interface";
import type { Role } from "../core/interfaces/Role.interface";

/* DTO's */
import type { CreateUserDto, UpdateUserDto } from "../core/dtos/User.dto";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";
import type { StatusMode } from "../core/types/StatusMode.type";

/* Services */
import UserService from "../core/services/user.service";
import RoleService from "../core/services/Role.service";

/* Helpers */
import { validateEmailHelper } from "../core/helpers/validators.helper";

interface Props {
  id: User["id"] | null;
}

export default function UsersForm({ id }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [statusMode, setStatusMode] = useState<StatusMode>("create");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [requestStatusRoles, setRequestStatusRoles] =
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

  const [roleId, setRoleId] = useState<string | null>(null);
  const [errorRoleId, setErrorRoleId] = useState<boolean>(false);

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
      const { name, email, active, role } = data;
      setName(name);
      setEmail(email);
      setRoleId(role.id as string);
      setActive(active);
      setRequestStatus("success");
    } catch (err) {
      setShowRequestMessage(true);
      setRequestStatus("failed");
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

  const getRoles = async () => {
    setRequestStatusRoles("loading");
    try {
      const { data } = await RoleService.getAllSimple();
      setRoles(data);
      setRequestStatusRoles("success");
    } catch (err) {
      setRequestStatusRoles("failed");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getRoles();
  }, []);

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
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      setErrorPasswordMessage(message);
      setErrorConfirmPasswordMessage(message);
    } else {
      setErrorPassword(false);
      setErrorConfirmPassword(false);
    }
  };

  const validateRoleId = () => {
    setTimeout(() => {
      roleId === "" || !roleId ? setErrorRoleId(true) : setErrorRoleId(false);
    }, 1000);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleChangeRole = (e: any) => {
    validateRoleId();
    setRoleId(e);
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
    setRoleId("");
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
    validateRoleId();
    if (
      errorName ||
      errorEmail ||
      errorPassword ||
      errorRoleId ||
      statusMode === "detail"
    )
      return;
    try {
      const role = Number.parseInt(roleId as string);
      if (statusMode === "create") {
        const dto: CreateUserDto = {
          name,
          email,
          password,
          role,
        };
        await UserService.save(dto);
        setRequestMessage("Usuario guardado correctamente");
        clean();
      } else {
        const dto: UpdateUserDto = {
          name,
          email,
          password,
          role,
          active,
        };
        await UserService.update(id as number, dto);
        setRequestMessage("Usuario actualizado correctamente");
        setStatusMode("detail");
      }
      setRequestStatus("success");
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { status } = e as any;
      if (status === 409) {
        setRequestMessage("El email ya existe en nuestros registros");
      } else {
        setRequestMessage("Usuario no pudo ser guardado");
      }
      setRequestStatus("failed");
    } finally {
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  return (
    <>
      <div className="UsersForm max-w-[800px] mx-auto">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="md:grid md:grid-cols-2 md:gap-x-3">
            {/* Name */}
            <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
              <InputGroup
                label="Ingresa el nombre"
                name="name"
                value={name}
                disabled={requestStatus === "loading"}
                readOnly={statusMode === "detail"}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
                errorMessage={"El nombre del usuario es obligatorio"}
                errorStatus={errorName}
              />
            </div>

            {/* Email */}
            <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
              <InputGroup
                label="Ingresa el correo electónico"
                name="email"
                type="email"
                value={email}
                disabled={requestStatus === "loading"}
                readOnly={statusMode === "detail"}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                errorMessage={errorEmailMessage}
                errorStatus={errorEmail}
              />
            </div>
          </div>

          {statusMode === "create" && (
            <div className="md:grid md:grid-cols-2 md:gap-x-3 ">
              {/* Password */}
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                <InputGroup
                  label="Ingresa la contraseña"
                  name="password"
                  type="password"
                  value={password}
                  disabled={requestStatus === "loading"}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  errorMessage={errorPasswordMessage}
                  errorStatus={errorPassword}
                />
              </div>

              {/* Confirm Password */}
              <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
                <InputGroup
                  label="Confirma la contraseña"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  disabled={requestStatus === "loading"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validatePassword}
                  errorMessage={errorConfirmPasswordMessage}
                  errorStatus={errorConfirmPassword}
                />
              </div>
            </div>
          )}

          <div className="md:grid md:grid-cols-2 md:gap-x-3 md:items-center">
            <SelectGroup
              label="Rol"
              name="rolId"
              value={roleId?.toString() as string}
              onValueChange={handleChangeRole}
              items={roles}
              itemsRequestStatus={requestStatusRoles}
              errorMessage="El Rol es obligatorio"
              errorStatus={errorRoleId}
            />

            {statusMode !== "create" && (
              <SwitchGroup
                label="Activar / Desactivar Usuario"
                name="activateUser"
                checked={active}
                onCheckedChange={setActive}
                disabled={statusMode === "detail"}
              />
            )}
          </div>

          <ButtonGroup
            statusMode={statusMode}
            changeEdit={changeEdit}
            cancel={cancel}
            url="/users"
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
