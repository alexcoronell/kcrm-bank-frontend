import { UserType } from "../interfaces/UserType.interface";

export interface CreateUserTypeDto
  extends Omit<
    UserType,
    "id" | "createAt" | "updateAt" | "active" | "deleted"
  > {}

export interface UpdateUserTypeDto extends CreateUserTypeDto {
  active: boolean;
}
