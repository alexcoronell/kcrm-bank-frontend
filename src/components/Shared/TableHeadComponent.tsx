import { TableHead, TableHeaderCell, TableRow } from "../ui/Table";

interface Props {
	titleColumns: string[];
}

export default function TableHeadComponent({ titleColumns }: Props) {
	return (
		<TableHead>
			<TableRow>
				<TableHeaderCell>Id.</TableHeaderCell>
				{titleColumns.map((title, index) => (
					<TableHeaderCell key={index}>{title}</TableHeaderCell>
				))}
				<TableHeaderCell className="text-center">Acciones</TableHeaderCell>
			</TableRow>
		</TableHead>
	);
}
