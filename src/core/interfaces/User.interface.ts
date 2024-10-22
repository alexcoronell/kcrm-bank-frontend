import { UserType } from "./UserType.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  active: boolean;
  deleted: boolean;
  userType: UserType;
}
