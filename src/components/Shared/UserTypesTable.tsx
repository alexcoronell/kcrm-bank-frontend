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
import { UserType } from "../../core/interfaces/UserType.interface";

/* Services */
import UserTypeService from "../../core/services/userType.service";

/* Types */
import { RequestStatus } from "../../core/types/RequestStatus.type";

/* Helpers */
import { formatDateTime } from "../../helpers/formatDate.helper";

export function UserTypesTable() {
  const [userTypes, setUserTypes] = useState<UserType[]>([])
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const columns = 7;
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const fetchData = async () => {
    setRequestStatus("loading");
    try {
      const {
        data: { items, count },
      } = await UserTypeService.getAll(page, limit);
      setRequestStatus("success");
      setUserTypes(items);
      setTotal(count);
      setTotalPages(Math.ceil(total / limit));
      console.log(items);
    } catch (e) {
      setRequestStatus("failed");
    }
  };

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id.</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Administrador</TableHeaderCell>
            <TableHeaderCell>Creado</TableHeaderCell>
            <TableHeaderCell>Actualizado</TableHeaderCell>
            <TableHeaderCell>Activo</TableHeaderCell>
            <TableHeaderCell className="text-center">
              Acciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {userTypes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isAdmin ? 'Sí' : 'No'}</TableCell>
                <TableCell>{formatDateTime(item.createAt)}</TableCell>
                <TableCell>{formatDateTime(item.updateAt)}</TableCell>
                <TableCell className="text-white">{item.active ? <span className="bg-green-900 px-2">Activo</span> : <span className="bg-red-900 px-2">Inactivo</span>}</TableCell>
                <TableCell className="action-buttons">
                  <Button variant="light"><EyeIcon classes="size-3" /></Button>
                  <Button variant="destructive"><TrashIcon classes="size-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
