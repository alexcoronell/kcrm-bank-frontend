import Page from "../components/layouts/Page";
import { UsersTable } from "../components/Shared/UsersTable";

/* Variables */
const titleButton = "Nuevo  usuario";
const url = "/users/create";

export default function UsersPage() {
  return (
    <Page titlePage="Usuarios" titleButton={titleButton} urlButton={url}>
      <UsersTable />
    </Page>
  );
}
