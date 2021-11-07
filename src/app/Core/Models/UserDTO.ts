export interface UserReqDTO {
  perPage: number;
  paginate: boolean;
}

export interface UserResDTO {
  birthDay: string;
  createdAt: string;
  family: string;
  id: number;
  name: string;
  phone: string;
  role: string;
}

export interface UserCreateReq {
  name: string;
  family: string;
  phone: string;
  username: string;
  password: string;
  birthDay: string;
  permissions: string[],
  role_id: number;
}

export interface UserRolesDTO {
  id: number;
  label: string;
  name: string;
  use: boolean;
}

