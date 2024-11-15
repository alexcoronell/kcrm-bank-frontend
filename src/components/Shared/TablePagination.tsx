import { useState, useEffect } from "react";
/* Components */
import { TableRow } from "../ui/Table";
import { TableCell } from "../ui/Table";
import { Button } from "../ui/Button";

interface Props {
  columns: number;
  page: number;
  limit: number;
  totalItems: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
}

export default function TablePagination({
  columns,
  page,
  limit,
  totalItems,
  prevPage,
  nextPage,
  setPage,
}: Props) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / limit);
    setTotalPages(totalPages);
  }, [limit, totalItems]);

  return (
    <TableRow>
      <TableCell colSpan={columns} className="text-center">
        <Button
          variant="ghost"
          className="mx-1"
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          Primera
        </Button>
        <Button
          variant="ghost"
          className="mx-1"
          disabled={page === 1}
          onClick={prevPage}
        >
          Anterior
        </Button>
        <p className="mx-3 inline">{page}</p>
        <Button
          variant="ghost"
          className="mx-1"
          onClick={nextPage}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
        <Button
          variant="ghost"
          className="mx-1"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          Ultima
        </Button>
      </TableCell>
    </TableRow>
  );
}
