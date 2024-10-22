import Page from "../components/layouts/Page";
import UsersForm from "../components/Shared/UsersForm";

export default function UsersFormPage() {
  const titlePage = "Crear Usuario"
  return (
    <Page titlePage={titlePage}>
        <UsersForm />
    </Page>
  );
}
