import { useState, useEffect } from "react";
import { Link } from "wouter";
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
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRequestStatus("loading");
    try {
      const { data } = await FranchiseService.getAll();
      setRequestStatus("success");
      setFranchise(data);
    } catch (e) {
      setRequestStatus("failed");
      console.error(e);
    }
  };

  const handleDelete = async (id: Franchise["id"]) => {
    try {
      const response = await FranchiseService.delete(id);
      fetchData();
    } catch (e) {
      setRequestStatus("failed");
      console.error(e);
    }
  };

  return (
    <TableRoot>
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
        {/* <TableFoot>
          <TableRow>
            <TableHeaderCell colSpan={2} scope="row" className="text-right">
              4,642
            </TableHeaderCell>
            <TableHeaderCell colSpan={3} scope="row" className="text-right">
              1
            </TableHeaderCell>
          </TableRow>
        </TableFoot> */}
      </Table>
    </TableRoot>
  );
}
