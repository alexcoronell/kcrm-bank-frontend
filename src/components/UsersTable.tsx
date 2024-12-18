/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Link } from "wouter";

/* Context */
import { AppContext } from "../context";

/* Components */
import EyeIcon from "./icons/EyeIcon";
import TrashIcon from "./icons/TrashIcon";
import TextInputPassword from "./icons/TextInputPassword";
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
import TablePagination from "./Shared/TablePagination";

/* Interfaces */
import type { User } from "../core/interfaces/User.interface";

/* Services */
import UserService from "../core/services/user.service";

/* Types */
import type { RequestStatus } from "../core/types/RequestStatus.type";

/* Helpers */
import { formatDateTime } from "../core/helpers/formatDate.helper";

export function UsersTable() {
  const context = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [showRequestMessage, setShowRequestMessage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const titleColumns = ["Nombre", "Email", "Creado", "Actualizado", "Activo"];
  const columns = titleColumns.length + 2;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  /**
   * Get data from api
   */
  const fetchData = async () => {
    setRequestStatus("loading");
    try {
      const {
        data: { items, count },
      } = await UserService.getAll(page, limit);
      setRequestStatus("success");
      setUsers(items);
      setTotal(count);
      setTotalPages(Math.ceil(total / limit));
    } catch (e) {
      console.error(e);
      setRequestStatus("failed");
    }
  };

  /**
   * Delete the item
   * @param id
   */
  const handleDelete = async () => {
    try {
      await UserService.delete(context.itemToDelete as number);
      fetchData();
      setRequestMessage("Usuario eliminado correctamente");
    } catch (e) {
      setRequestStatus("failed");
      setRequestMessage("Usuario no pudo ser eliminado, intente más tarde");
      console.error(e);
    } finally {
      context.hideConfirmDeleteMessage();
      setShowRequestMessage(true);
      setTimeout(() => setShowRequestMessage(false), 2000);
    }
  };

  /**
   * Change number of items per page
   * @param e
   */

  const handleChangeLimit = (e: string) => {
    setLimit(Number.parseInt(e));
  };

  /**
   * Set the previous page
   * @returns void
   */
  const prevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  /**
   * Set the next page
   * @returns void
   */
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
          <TableHeadComponent titleColumns={titleColumns} />
          <TableBody>
            {total > 0 && requestStatus !== "loading" ? (
              <>
                {users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
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
                      <Link href={`/users/detail/${item.id}`}>
                        <Button variant="light">
                          <EyeIcon classes="size-4" />
                        </Button>
                      </Link>
                      <Link href={`/users/password/${item.id}`}>
                        <Button variant="light">
                          <TextInputPassword classes="size-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          context.showConfirmDeleteMessage(item.id)
                        }
                      >
                        <TrashIcon classes="size-4" />
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
            <TablePagination
              columns={columns}
              page={page}
              limit={limit}
              totalItems={total}
              prevPage={prevPage}
              nextPage={nextPage}
              setPage={setPage}
            />

            <TableRowTotal columns={columns} total={total} />
          </TableFoot>
        </Table>
      </TableRoot>
      <ConfirmDeleteMessage
        message="¿Realmente desea eliminar el Usuario?"
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
