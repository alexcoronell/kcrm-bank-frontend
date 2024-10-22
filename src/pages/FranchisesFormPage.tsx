import Page from "../components/layouts/Page";
import FranchisesForm from "../components/Shared/FranchisesForm";

export default function FranchisesFormPage() {
  const titlePage = "Crear Franquicia";
  return (
    <Page titlePage={titlePage}>
      <FranchisesForm />
    </Page>
  );
}
