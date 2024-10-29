import { TableHeaderCell, TableRow } from "../ui/Table";

interface Props {
  columns: number;
  total: number;
}

export default function TableRowTotal({ columns, total }: Props) {
  return (
    <TableRow>
      <TableHeaderCell
        colSpan={columns - 2}
        scope="row"
        className="text-right"
      ></TableHeaderCell>
      <TableHeaderCell scope="row" className="text-right">
        Total:
      </TableHeaderCell>
      <TableHeaderCell scope="row" className="text-center">
        {total}
      </TableHeaderCell>
    </TableRow>
  );
}
