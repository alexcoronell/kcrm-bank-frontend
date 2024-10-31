export interface Product {
	id: number;
	name: string;
    rateRequired: boolean;
	franchiseRequired: boolean;
	createAt: Date;
	updateAt: Date;
	active: boolean;
	deleted: boolean;
}
