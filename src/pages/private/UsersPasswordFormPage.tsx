import { useEffect, useState } from "react";
import { useParams } from "wouter";

/* Components */
import Page from "../../components/layouts/Page";
import UsersPasswordForm from "../../components/UsersPasswordForm";

export default function UsersPasswordFormPage() {
	const [currentId, setCurrentId] = useState<number | null>(null);
	const titlePage = "Cambio de Contraseña"

	const params = useParams();
	useEffect(() => {
		if (params.id) {
			setCurrentId(Number.parseInt(params.id));
		} 
	});
    return (
		<Page titlePage={titlePage}>
			<UsersPasswordForm id={currentId} />
		</Page>
	);  
};
