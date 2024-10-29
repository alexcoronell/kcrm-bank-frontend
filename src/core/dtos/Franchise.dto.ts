import { Franchise } from "../interfaces/Franchise.interface";

export interface CreateFranchiseDto extends Omit<Franchise, "id" | "createAt" | "updateAt" | "active" | "deleted"> {}

export interface UpdateFranchiseDto extends CreateFranchiseDto {
  active: boolean;
}