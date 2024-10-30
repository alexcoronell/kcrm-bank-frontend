import type { Sale } from "../interfaces/Sale.interface";

export interface CreateSaleDto
  extends Omit<
    Sale,
    "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "deleted"
  > {
  createdBy: number;
}

export interface UpdateSaleDto extends Omit<CreateSaleDto, "createdBy"> {
  updatedBy: number;
}
