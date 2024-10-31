import ProductsTable from '../../components/Shared/ProductsTable';

/* Components */
import Page from "../../components/layouts/Page";

/* Variables */
const titleButton = "Nuevo producto";
const url = "/products/create";

export default function ProductsPage() {
  return (
		<Page titlePage="Productos" titleButton={titleButton} urlButton={url}>
			<ProductsTable />
		</Page>
	);
}
