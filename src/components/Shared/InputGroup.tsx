/* Components */
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";

interface Props {
  label: string;
  value: string;
  name: string;
  type?: string;
  disabled: boolean;
  readOnly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  errorMessage?: string;
  errorStatus?: boolean;
}

export default function InputGroup({
  label,
  name,
  type = "text",
  value,
  disabled = false,
  readOnly = false,
  onChange,
  onBlur,
  errorMessage = "",
  errorStatus = false,
}: Props) {
  return (
    <>
      {" "}
      <Label htmlFor={name}>{label}</Label>{" "}
      <Input
        placeholder={label}
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />{" "}
      <ErrorInputMessage
        errorMessage={errorMessage}
        errorStatus={errorStatus}
      />
    </>
  );
}
