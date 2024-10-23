import Page from "../components/layouts/Page";
import { FranchisesTable } from "../components/Shared/FranchisesTable";
const titleButton = "Nueva franquicia"
const url = "/franchises/create"

export default function FranchisesPage() {
  return (
    <Page titlePage="Franquicias" titleButton={titleButton} urlButton={url}>
      <FranchisesTable />
    </Page>
  );
}
