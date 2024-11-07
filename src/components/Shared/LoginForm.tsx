import { useState, useEffect, useContext } from "react";
import { navigate } from "wouter/use-browser-location";

import { AppContext } from "../../context";

/* Components */
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
import { RequestMessage } from "../ui/RequestMessage";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";

/* Services */
import AuthService from "../../core/services/auth.service";

/* Helpers */
import { validateEmailHelper } from "../../core/helpers/validators.helper";
import type { LoginDto } from "../../core/dtos/Login.dto";

interface Responses {
  status: number;
  message: string;
}

export default function LoginForm() {
  const context = useContext(AppContext);
  const [email, setEmail] = useState("jdoe@email.com");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [password, setPassword] = useState("12345678");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");

  const requestMessage = "Usuario o contraseña no validos";
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);

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
    } else {
      setErrorPassword(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setRequestStatus("loading");
    validateEmail();
    validatePassword();
    if (errorEmail || errorPassword) return;
    try {
      const dto: LoginDto = {
        email,
        password,
      };
      const { data } = await AuthService.login(dto);
      navigate("/dashboard");
      const { isAdmin, publicUser } = data;
      context.login(publicUser, isAdmin);
    } catch (e) {
      const { status } = e as Responses;
      setRequestStatus("failed");
      if (status === 404) setShowRequestMessage(true);
      setTimeout(() => {
        setShowRequestMessage(false);
      }, 5000);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-xs space-y-2 my-6">
            {" "}
            <Label htmlFor="email">Ingresa tu Email</Label>{" "}
            <Input
              placeholder="Ingresa tu email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              onBlur={validateEmail}
            />{" "}
            <ErrorInputMessage
              message={errorEmailMessage}
              errorStatus={errorEmail}
            />
          </div>

          <div className="mx-auto max-w-xs space-y-2 my-6">
            {" "}
            <Label htmlFor="email">Ingresa tu Contraseña</Label>{" "}
            <Input
              placeholder="Enter password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              onBlur={validatePassword}
            />{" "}
            <ErrorInputMessage
              message={errorPasswordMessage}
              errorStatus={errorPassword}
            />
          </div>

          <div className="mx-auto max-w-xs my-6 flex items-center justify-center gap-x-3">
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
            <Button type="button" className="w-full" variant="light">
              Limpiar
            </Button>
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
