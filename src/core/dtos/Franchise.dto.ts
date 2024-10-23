export interface CreateFranchiseDto {
  name: string;
}

export interface UpdateFranchiseDto extends CreateFranchiseDto {
  active: boolean;
}
