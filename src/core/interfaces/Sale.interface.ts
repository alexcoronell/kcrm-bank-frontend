import { User } from "./User.interface";
import { Product } from "../enums/Product.enum";

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
