import { UserTypesTable } from "../components/Shared/UserTypesTable";
/* Components */
import Page from "../components/layouts/Page";

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
