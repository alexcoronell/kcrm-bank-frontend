import Page from "../components/layouts/Page"
import { FranchisesTable } from "../components/Shared/FranchisesTable";

export default function FranchisesPage() {
    return (
        <Page titlePage="Franquicias">
          <FranchisesTable />
        </Page>
      );
};
