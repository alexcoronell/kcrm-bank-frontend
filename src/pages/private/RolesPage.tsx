import { RolesTable } from "../../components/RolesTable";
/* Components */
import Page from "../../components/layouts/Page";

/* Variables */
const titleButton = "Nuevo tipo de usuario";
const url = "/roles/create";

export default function RolesPage() {
	return (
		<Page
			titlePage="Roles"
			titleButton={titleButton}
			urlButton={url}
		>
			<RolesTable />
		</Page>
	);
}
