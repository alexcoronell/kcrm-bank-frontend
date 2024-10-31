import { SalesTable } from "../../components/Shared/SalesTable";

/* Components */
import Page from "../../components/layouts/Page";

/* Variables */
const titleButton = "Nueva venta";
const url = "/sales/create";

export default function UsersPage() {
  return (
    <Page titlePage="Ventas" titleButton={titleButton} urlButton={url}>
      <SalesTable />
    </Page>
  );
}
