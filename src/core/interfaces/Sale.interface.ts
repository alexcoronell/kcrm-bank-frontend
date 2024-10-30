import type { Product } from "../enums/Product.enum";
import type { User } from "./User.interface";

export interface Sale {
	id: number;
	quotaRequested: number;
	product: Product;
	rate: string;
	createAt: Date;
	createdBy: User;
	updateAt: Date;
	updatedBy: User;
	deleted: boolean;
}
