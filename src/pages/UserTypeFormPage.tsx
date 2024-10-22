import Page from "../components/layouts/Page";
import UserTypeForm from "../components/Shared/UserTypeForm";

export default function UserTypeFormPage() {
  const titlePage = "Crear Tipo de Usuario";
  return (
    <Page titlePage={titlePage}>
      <UserTypeForm />
    </Page>
  );
}
