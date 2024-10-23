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

import { Sale } from "../../core/interfaces/Sale.interface";

import SaleService from "../../core/services/sale.service";

import { formatDateTime } from "../../helpers/formatDate.helper";

export function SalesTable() {
  const [sales, setSales] = useState<Sale[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await SaleService.getAll();
      setSales(await data as unknown as Sale[]);
      console.log(sales);
    };
    fetchData().catch((e) => console.error(e));
  }, []);

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id.</TableHeaderCell>
            <TableHeaderCell>Cupo Solicitado</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Tasa</TableHeaderCell>
            <TableHeaderCell>Creado</TableHeaderCell>
            <TableHeaderCell>Creado por</TableHeaderCell>
            <TableHeaderCell>Actualizado</TableHeaderCell>
            <TableHeaderCell>Actualizado Por</TableHeaderCell>
            <TableHeaderCell className="text-center">
              Acciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {sales.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.quotaRequested}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.rate}</TableCell>
                <TableCell>{formatDateTime(item.createAt)}</TableCell>
                <TableCell>{item.createdBy.name}</TableCell>
                <TableCell>{formatDateTime(item.updateAt)}</TableCell>
                <TableCell>{item.updatedBy.name}</TableCell>
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
