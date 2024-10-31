import type { Role } from "./Role.interface";

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	createAt: Date;
	updateAt: Date;
	active: boolean;
	deleted: boolean;
	role: Role;
}
