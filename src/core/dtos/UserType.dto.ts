export interface CreateUserTypeDto {
    name: string;
  }
  
  export interface UpdateUserTypeDto extends CreateUserTypeDto {
    active: boolean;
  }
  