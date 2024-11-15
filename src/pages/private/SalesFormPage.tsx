/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "wouter";

/* Components */
import Page from "../../components/layouts/Page";
import SalesForm from "../../components/SalesForm";

export default function SalesFormPage() {
	const [currentId, setCurrentId] = useState<number | null>(null);
	const [titlePage, setTitlePage] = useState("Detalle de Venta");
	const params = useParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(params.id);
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} else {
			setTitlePage("Crear Venta");
		}
	}, []);

	return (
		<Page titlePage={titlePage}>
			<SalesForm id={currentId} />
		</Page>
	);
}
