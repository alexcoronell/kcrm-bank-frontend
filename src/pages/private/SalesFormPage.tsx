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

	useEffect(() => {
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} else {
			setTitlePage("Crear Tipo de Usuario");
		}
	}, []);

	return (
		<Page titlePage="Crear Venta">
			<SalesForm id={currentId} />
		</Page>
	);
}
