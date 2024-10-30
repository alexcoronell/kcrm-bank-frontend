import { useEffect, useState } from "react";
import { useParams } from "wouter";

import UsersForm from "../components/Shared/UsersForm";
/* Components */
import Page from "../components/layouts/Page";

export default function UsersFormPage() {
	const [currentId, setCurrentId] = useState<number | null>(null);
	const [titlePage, setTitlePage] = useState("Detalle Usuario");
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
			<UsersForm id={currentId} />
		</Page>
	);
}
