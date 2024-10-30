import { TableCell, TableRow } from "../ui/Table";

import type { RequestStatus } from "../../core/types/RequestStatus.type";

interface Props {
	itemLength: number;
	requestStatus: RequestStatus;
	columns: number;
}

export default function TableRowAlternative({
	itemLength,
	requestStatus,
	columns,
}: Props) {
	return (
		<>
			{(itemLength < 1 || itemLength === undefined) &&
				requestStatus !== "loading" &&
				requestStatus !== "failed" && (
					<TableRow>
						<TableCell colSpan={columns} className="text-center">
							----- No hay Datos -----
						</TableCell>
					</TableRow>
				)}

			{(itemLength < 1 || itemLength === undefined) &&
				requestStatus === "failed" && (
					<TableRow>
						<TableCell colSpan={columns} className="text-center">
							----- Error cargando los datos -----
						</TableCell>
					</TableRow>
				)}
			{requestStatus === "loading" && (
				<TableRow>
					<TableCell colSpan={columns} className="text-center">
						----- Cargando los datos -----
					</TableCell>
				</TableRow>
			)}
		</>
	);
}
