export interface AuthRequestDTO {
  password?: string;
  code?: string;
  phone?: string;
  tokenType?: string;
}

export interface LoginResponseDTO {
  user: UserDTO;
  token: string
}

export interface UserDTO {
  id: number;
  role: string;
  phone: string;
  username: string;
  birthDay: string;
  family: string;
  name: string;
}

export interface ValidateResponseDTO {
  authMode: number;
  phone: string;
}
