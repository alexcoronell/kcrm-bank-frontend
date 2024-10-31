import { useEffect, useState } from "react";
import { Link } from "wouter";
import EyeIcon from "../icons/EyeIcon";
import TrashIcon from "../icons/TrashIcon";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableRoot,
  TableRow,
} from "../ui/Table";
import TableHeadComponent from "./TableHeadComponent";
import TableRowAlternative from "./TableRowAlternative";
import TableRowTotal from "./TableRowTotal";

/* Interfaces */
import type { Role } from "../../core/interfaces/Role.interface";

/* Services */
import RoleService from "../../core/services/Role.service";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";

/* Helpers */
import { formatDateTime } from "../../core/helpers/formatDate.helper";

export function RolesTable() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const columns = 7;
  const titleColums = [
    "Nombre",
    "Administrador",
    "Creado",
    "Actualizado",
    "Activo",
  ];
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
      } = await RoleService.getAll(page, limit);
      setRequestStatus("success");
      setRoles(items);
      setTotal(count);
      setTotalPages(Math.ceil(total / limit));
      console.log(items);
    } catch (e) {
      setRequestStatus("failed");
    }
  };

  /**
   * Delete the item
   * @param id
   */
  const handleDelete = async (id: UserType["id"]) => {
    try {
      const response = await RoleService.delete(id);
      fetchData();
    } catch (e) {
      setRequestStatus("failed");
      console.error(e);
    }
  };

  /**
   * Change number of items per page
   * @param e
   */
  const handleChangeLimit = (e: any) => {
    setLimit(e);
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
              {roles.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.isAdmin ? "Sí" : "No"}</TableCell>
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
                    <Link href={`/roles/detail/${item.id}`}>
                      <Button variant="light">
                        <EyeIcon classes="size-3" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
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
  );
}
