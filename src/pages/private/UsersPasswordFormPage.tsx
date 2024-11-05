import Page from "../../components/layouts/Page";
import UsersPasswordForm from "../../components/Shared/UsersPasswordForm";

export default function UsersPasswordFormPage() {

	const titlePage = "Nueva Contraseña"
    return (
		<Page titlePage={titlePage}>
			<UsersPasswordForm />
		</Page>
	);  
};
