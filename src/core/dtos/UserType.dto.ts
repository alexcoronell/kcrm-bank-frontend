export interface CreateUserTypeDto {
    name: string;
    isAdmin: boolean;
  }
  
  export interface UpdateUserTypeDto extends CreateUserTypeDto {
    active: boolean;
  }
  