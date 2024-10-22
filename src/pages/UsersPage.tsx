import Page from "../components/layouts/Page";
import { UsersTable } from "../components/Shared/UsersTable";

export default function UsersPage() {
  return (
    <Page titlePage="Usuarios">
      <UsersTable />
    </Page>
  );
}
