import type { Product } from "./Product.interface";
import type { Franchise } from "./Franchise.interface";
import type { User } from "./User.interface";

export interface Sale {
  id: number;
  product: Product;
  franchise: Franchise | null;
  quotaRequested: number;
  rate: number | null;
  createAt: Date;
  createdBy: User;
  updateAt: Date;
  updatedBy: User;
  deleted: boolean;
}
