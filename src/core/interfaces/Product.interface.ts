export interface Product {
	id: number;
	name: string;
    rateRequired: boolean;
	createAt: Date;
	updateAt: Date;
	active: boolean;
	deleted: boolean;
}
