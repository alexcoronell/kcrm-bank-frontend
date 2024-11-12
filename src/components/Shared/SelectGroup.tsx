import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import { SelectTrigger } from "../ui/Select";
import { SelectValue } from "@radix-ui/react-select";
import { SelectContent } from "../ui/Select";
import { SelectItem } from "../ui/Select";
import SelectItemAlternative from "./SelectItemAlternative";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";

import type { Role } from "../../core/interfaces/Role.interface";
import type { Product } from "../../core/interfaces/Product.interface";
import type { Franchise } from "../../core/interfaces/Franchise.interface";

import type { RequestStatus } from "../../core/types/RequestStatus.type";

interface Props {
  label: string;
  name: string;
  onValueChange: (event: string) => void;
  onBlur?: () => void;
  value: string;
  items: Role[] | Product[] | Franchise[];
  itemsRequestStatus: RequestStatus;
  errorMessage?: string;
  errorStatus?: boolean;
}

export default function SelectGroup({
  label,
  name,
  value,
  onValueChange,
  onBlur,
  items = [],
  itemsRequestStatus = "init",
  errorMessage = "",
  errorStatus = false,
}: Props) {
  return (
    <div className="mx-auto max-md:max-w-xs md:w-full space-y-2 my-6 md:my-3">
      <Label htmlFor={name}>{label}</Label>{" "}
      <Select onValueChange={onValueChange} name={name} value={value}>
        {" "}
        <SelectTrigger id={name} className="mt-2">
          {" "}
          <SelectValue placeholder="Select" />{" "}
        </SelectTrigger>{" "}
        <SelectContent onBlur={onBlur}>
          {items.length > 0 && itemsRequestStatus === "success" ? (
            <>
              {" "}
              {items.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <SelectItem key={index} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </>
          ) : (
            <SelectItemAlternative
              total={items.length}
              status={itemsRequestStatus}
            />
          )}
        </SelectContent>
      </Select>
      <ErrorInputMessage
        errorMessage={errorMessage}
        errorStatus={errorStatus}
      />
    </div>
  );
}
