import type { RequestStatus } from "../../core/types/RequestStatus.type";
import { SelectItem } from "../ui/Select";

interface Props {
	total: number;
	status: RequestStatus;
}

export default function SelectItemAlternative({ total, status }: Props) {
	if (status === "failed") {
		return <SelectItem value="null"> error </SelectItem>;
	}
	if ((status === "init" || status === "success") && total === 0) {
		return <SelectItem value="null"> No data </SelectItem>;
	}
	if (status === "loading") {
		return <SelectItem value="null"> Cargando </SelectItem>;
	}
	return null;
}
