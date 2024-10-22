import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
  } from "../ui/Table"
  
  export function TableUsers() {
    
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
              <TableHeaderCell>Creado por</TableHeaderCell>
              <TableHeaderCell>Actualizado</TableHeaderCell>
              <TableHeaderCell>Actualizado por</TableHeaderCell>
              <TableHeaderCell>Activo</TableHeaderCell>
              <TableHeaderCell className="action-buttons">Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">{item.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={2} scope="row" className="text-right">
                4,642
              </TableHeaderCell>
              <TableHeaderCell colSpan={3} scope="row" className="text-right">
                497
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    )
  }