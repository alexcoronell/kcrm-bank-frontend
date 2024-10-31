import { useEffect, useState } from "react";
import { useParams } from "wouter";

import UserTypeForm from "../../components/Shared/RoleForm";
/* Components */
import Page from "../../components/layouts/Page";

export default function RolesFormPage() {
	const [currentId, setCurrentId] = useState<number | null>(null);
	const [titlePage, setTitlePage] = useState("Detalle Tipo de Usuario");
	const params = useParams();
	useEffect(() => {
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} else {
			setTitlePage("Crear Tipo de Usuario");
		}
	});
	return (
		<Page titlePage={titlePage}>
			<UserTypeForm id={currentId} />
		</Page>
	);
}
