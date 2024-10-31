import { useEffect, useState } from "react";
import { useParams } from "wouter";

/* Components */
import Page from "../../components/layouts/Page";
import ProductsForm from '../../components/Shared/ProductsForm';

export default function ProductsFormPage() {
    const [currentId, setCurrentId] = useState<number | null>(null);
	const [titlePage, setTitlePage] = useState("Detalle Producto");
	const params = useParams();
	useEffect(() => {
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} else {
			setTitlePage("Crear Producto");
		}
	});
	return (
		<Page titlePage={titlePage}>
			<ProductsForm id={currentId} />
		</Page>
	);
};
