export interface Sale {
  id: number;
  quotaRequested: number;
  rate: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
  product: string;
}
