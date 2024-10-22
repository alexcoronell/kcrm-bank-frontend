import Page from "../components/layouts/Page";
import { TableUsers } from "../components/Shared/TableUsers";

export default function UsersPage() {
  return (
    <Page titlePage="Usuarios">
      <TableUsers />
    </Page>
  );
}
