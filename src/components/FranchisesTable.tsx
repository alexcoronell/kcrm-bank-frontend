import { useEffect, useState, useContext } from "react";
import { Link } from "wouter";

/* Context */
import { AppContext } from "../context";

/* Components */
import EyeIcon from "./icons/EyeIcon";
import TrashIcon from "./icons/TrashIcon";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableRoot,
  TableRow,
} from "./ui/Table";
import TableHeadComponent from "./Shared/TableHeadComponent";
import TableRowAlternative from "./Shared/TableRowAlternative";
import TableRowTotal from "./Shared/TableRowTotal";
import ConfirmDeleteMessage from "./Shared/ConfirmDeleteMessage";
import { RequestMessage } from "./ui/RequestMessage";

/* Interfaces */
import type { Franchise } from "../core/interfaces/Franchise.interface";

/* Services */
import FranchiseService from "../core/services/franchise.service";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";

/* Helpers */
import { formatDateTime } from "../core/helpers/formatDate.helper";

export function FranchisesTable() {
  const context = useContext(AppContext);
  const [franchises, setFranchise] = useState<Franchise[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const columns = 6;
  const titleColums = ["Nombre", "Creado", "Actualizado", "Activo"];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const fetchData = async () => {
    setRequestStatus("loading");
    try {
      const {
        data: { items, count },
      } = await FranchiseService.getAll(page, limit);
      setRequestStatus("success");
      setFranchise(items);
      setTotal(count);
      setTotalPages(Math.ceil(total / limit));
    } catch (e) {
      setRequestStatus("failed");
    }
  };

  const handleDelete = async () => {
    try {
      await FranchiseService.delete(context.itemToDelete as number);
      fetchData();
      setRequestMessage("Franquicia eliminada correctamente");
    } catch (e) {
      setRequestStatus("failed");
      setRequestMessage("Franquicia no pudo ser eliminada, intente más tarde");
      console.error(e);
    } finally {
      context.hideConfirmDeleteMessage();
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  const handleChangeLimit = (e: string) => {
    setLimit(Number.parseInt(e));
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <>
      <TableRoot>
        <div className="flex items-center justify-end px-3">
          <div className="inline-grid grid-cols-2 items-center gap-x-3">
            <Label htmlFor="size">Items por página</Label>{" "}
            <Select
              onValueChange={handleChangeLimit}
              value={limit.toString()}
              disabled={total < 5}
            >
              {" "}
              <SelectTrigger id="size" className="mt-2">
                {" "}
                <SelectValue placeholder="Select" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                {total > 25 && <SelectItem value="25">25</SelectItem>}
                {total > 50 && <SelectItem value="50">50</SelectItem>}
                {total > 100 && <SelectItem value="100">100</SelectItem>}{" "}
              </SelectContent>{" "}
            </Select>
          </div>
        </div>
        <Table>
          <TableHeadComponent titleColumns={titleColums} />
          <TableBody>
            {total > 0 && requestStatus !== "loading" ? (
              <>
                {franchises.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{formatDateTime(item.createAt)}</TableCell>
                    <TableCell>{formatDateTime(item.updateAt)}</TableCell>
                    <TableCell className="text-white">
                      {item.active ? (
                        <span className="bg-green-900 px-2">Activo</span>
                      ) : (
                        <span className="bg-red-900 px-2">Inactivo</span>
                      )}
                    </TableCell>
                    <TableCell className="action-buttons">
                      <Link href={`/franchises/detail/${item.id}`}>
                        <Button variant="light">
                          <EyeIcon classes="size-3" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          context.showConfirmDeleteMessage(item.id)
                        }
                      >
                        <TrashIcon classes="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRowAlternative
                itemLength={total}
                requestStatus={requestStatus}
                columns={columns}
              />
            )}
          </TableBody>

          <TableFoot>
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

            <TableRowTotal columns={columns} total={total} />
          </TableFoot>
        </Table>
      </TableRoot>
      <ConfirmDeleteMessage
        message="¿Realmente desea eliminar la francquicia?"
        onClick={handleDelete}
      />
      <RequestMessage
        message={requestMessage}
        status={requestStatus}
        showMessage={showRequestMessage}
      />
    </>
  );
}
