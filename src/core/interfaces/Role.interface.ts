export interface Role {
	id: number;
	name: string;
	createAt: Date;
	updateAt: Date;
	isAdmin: boolean;
	active: boolean;
	deleted: boolean;
}
