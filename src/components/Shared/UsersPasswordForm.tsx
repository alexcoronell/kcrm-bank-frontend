import { useEffect, useState } from "react";
import { Link } from "wouter";
import { navigate } from "wouter/use-browser-location";

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

/* Interfaces */
import type { User } from "../../core/interfaces/User.interface";
import type { Role } from "../../core/interfaces/Role.interface";

/* DTO's */
import type { UpdateUserPasswordDto } from "../../core/dtos/User.dto";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";
import type { StatusMode } from "../../core/types/StatusMode.type";

/* Services */
import UserService from "../../core/services/user.service";
import RoleService from "../../core/services/Role.service";

/* Helpers */
import { validateEmailHelper } from "../../core/helpers/validators.helper";

interface Props {
  id: User["id"] | null;
}

export default function UsersPasswordForm({ id }: Props) {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<boolean>(false);
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] =
    useState<string>("");

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

  const cancel = () => {
    navigate("/users");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validatePassword();
    console.log("SAVE", errorPassword, errorConfirmPassword)
    if (errorPassword || errorConfirmPassword) return;
    try {
      const dto: UpdateUserPasswordDto = { password };
      console.log(dto)
      const res = await UserService.updatePassword(id as User["id"], dto);
      alert("Contraseña actualizada");
    } catch (e) {
      console.error(e);
      alert("Contraseña no actualizada");
    }
  };

  return (
    <div className="UsersForm max-w-[800px] mx-auto">
      <form onSubmit={handleSubmit} autoComplete="off">
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
              autoComplete="off"
              disabled={requestStatus === "loading"}
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
              autoComplete="off"
              disabled={requestStatus === "loading"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validatePassword}
            />{" "}
            <ErrorInputMessage
              message={errorConfirmPasswordMessage}
              errorStatus={errorConfirmPassword}
            />
          </div>
        </div>
        <div className="mx-auto max-w-xs my-6 grid grid-cols-2 gap-x-3">
          <Button type="submit" className="w-full">
            Guardar
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="light"
            onClick={cancel}
          >
            Cancelar / Volver
          </Button>
        </div>
      </form>
    </div>
  );
}
