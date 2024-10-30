import type { User } from "../interfaces/User.interface";

export interface CreateUserDto
	extends Omit<
		User,
		"id" | "createAt" | "updateAt" | "active" | "deleted" | "userType"
	> {
	userType: number;
}

export interface UpdateUserDto extends CreateUserDto {
	active: boolean;
}

export interface UpdateUserPasswordDto {
	password: string;
}
