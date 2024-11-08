import { Switch } from "../ui/Switch";
import { Label } from "../ui/Label";

interface Props {
  label: string;
  name: string;
  checked: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onCheckedChange: any;
  disabled: boolean;
}

export default function SwitchGroup({
  label,
  name,
  checked = false,
  onCheckedChange,
  disabled = false,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2 my-6 md:py-3">
      {" "}
      <Switch
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />{" "}
      <Label htmlFor="activateUser">{label}</Label>{" "}
    </div>
  );
}
