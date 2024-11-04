import type { Sale } from "../interfaces/Sale.interface";

export interface CreateSaleDto
	extends Omit<
		Sale,
		| "id"
		| "product"
		| "franchise"
		| "createdAt"
		| "updatedAt"
		| "createdBy"
		| "updatedBy"
		| "deleted"
	> {
	product: number;
	franchise: number | null;
	createdBy: number;
}

export interface UpdateSaleDto extends Omit<CreateSaleDto, "createdBy"> {
	updatedBy: number;
}
