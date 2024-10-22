import Page from "../components/layouts/Page"
import { UserTypesTable } from "../components/Shared/UserTypesTable"

export default function UserTypePage() {
    return (
        <Page titlePage="Tipos de Usuario">
          <UserTypesTable />
        </Page>
      );
};
