/* Components */
import Page from "../components/layouts/Page";
import { UserTypesTable } from "../components/Shared/UserTypesTable";

/* Variables */
const titleButton = "Nuevo tipo de usuario";
const url = "/user-types/create";

export default function UserTypePage() {
  return (
    <Page
      titlePage="Tipos de Usuario"
      titleButton={titleButton}
      urlButton={url}
    >
      <UserTypesTable />
    </Page>
  );
}
