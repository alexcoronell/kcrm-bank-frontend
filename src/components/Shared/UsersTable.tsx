import { useState, useEffect } from "react";
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
import EyeIcon from '../icons/EyeIcon'
import TrashIcon from '../icons/TrashIcon'

import { User } from "../../core/interfaces/User.interface";

import UserService from "../../core/services/user.service";

import { formatDateTime } from "../../helpers/formatDate.helper";

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await UserService.getAll();
      setUsers(await data as unknown as User[]);
      console.log(users);
    };
    fetchData().catch((e) => console.error(e));
  }, []);

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id.</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Tipo de Usuario</TableHeaderCell>
            <TableHeaderCell>Creado</TableHeaderCell>
            <TableHeaderCell>Actualizado</TableHeaderCell>
            <TableHeaderCell>Activo</TableHeaderCell>
            <TableHeaderCell className="text-center">
              Acciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.userType.name}</TableCell>
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
