import { useState, useEffect } from "react";
import { Link } from "wouter";
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
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "../ui/Table";
import { Button } from "../ui/Button";
import EyeIcon from "../icons/EyeIcon";
import TrashIcon from "../icons/TrashIcon";

/* Interfaces */
import { Franchise } from "../../core/interfaces/Franchise.interface";

/* Services */
import FranchiseService from "../../core/services/franchise.service";

/* Types */
import { RequestStatus } from "../../core/types/RequestStatus.type";

/* Helpers */
import { formatDateTime } from "../../helpers/formatDate.helper";

export function FranchisesTable() {
  const [franchises, setFranchise] = useState<Franchise[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [itemsByPages, setItemByPages] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  useEffect(() => {
    console.log(itemsByPages);
    fetchData();
  }, [itemsByPages]);

  const fetchData = async () => {
    setRequestStatus("loading");
    try {
      const {
        data: { items, totalItems },
      } = await FranchiseService.getAll();
      setRequestStatus("success");
      setFranchise(items);
      setTotal(totalItems);
    } catch (e) {
      setRequestStatus("failed");
    }
  };

  const handleDelete = async (id: Franchise["id"]) => {
    try {
      const response = await FranchiseService.delete(id);
      console.log(response);
      fetchData();
    } catch (e) {
      setRequestStatus("failed");
      console.error(e);
    }
  };

  const handleChangeItemsByPage = (e: any) => {
    setItemByPages(e);
  };

  return (
    <TableRoot>
      <div className="flex items-center justify-end px-3">
        <div className="inline-grid grid-cols-2 items-center gap-x-3">
          <Label htmlFor="size">Items por página</Label>{" "}
          <Select
            onValueChange={handleChangeItemsByPage}
            value={itemsByPages.toString()}
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
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>{" "}
            </SelectContent>{" "}
          </Select>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id.</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Creado</TableHeaderCell>
            <TableHeaderCell>Actualizado</TableHeaderCell>
            <TableHeaderCell>Activo</TableHeaderCell>
            <TableHeaderCell className="text-center">Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        {franchises.length > 0 && requestStatus !== "loading" && (
          <TableBody>
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
                    onClick={() => handleDelete(item.id)}
                  >
                    <TrashIcon classes="size-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {(franchises.length < 1 || franchises.length === undefined) &&
          requestStatus !== "loading" &&
          requestStatus !== "failed" && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  ----- No hay Datos -----
                </TableCell>
              </TableRow>
            </TableBody>
          )}

        {(franchises.length < 1 || franchises.length === undefined) &&
          requestStatus === "failed" && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  ----- Error cargando los datos -----
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        {requestStatus === "loading" && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                ----- Cargando los datos -----
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TableFoot>
          <TableRow>
            <TableHeaderCell colSpan={2} scope="row" className="text-right">
              4,642
            </TableHeaderCell>
            <TableHeaderCell colSpan={3} scope="row" className="text-right">
              1
            </TableHeaderCell>
          </TableRow>
        </TableFoot>
      </Table>
    </TableRoot>
  );
}
