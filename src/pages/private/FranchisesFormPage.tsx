import { useEffect, useState } from "react";
import { useParams } from "wouter";

import FranchisesForm from "../../components/Shared/FranchisesForm";
import Page from "../../components/layouts/Page";

export default function FranchisesFormPage() {
	const [currentId, setCurrentId] = useState<number | null>(null);
	const [titlePage, setTitlePage] = useState("Detalle Franquicia");
	const params = useParams();
	useEffect(() => {
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} else {
			setTitlePage("Crear Franquicia");
		}
	});
	return (
		<Page titlePage={titlePage}>
			<FranchisesForm id={currentId} />
		</Page>
	);
}
