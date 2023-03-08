export interface AuthRequestDTO {
  password?: string;
  code?: string;
  phone?: string;
  tokenType?: string;
}

export interface LoginResponseDTO {
  user: ProfileDTO;
  token: string
}

export interface UserDTO {
  id: number;
  role: string;
  phone: string;
  username: string;
  createdAt?: string;
  birthDay: string;
  family: string;
  name: string;
}

export interface ValidateResponseDTO {
  authMode: number;
  phone: string;
}

export interface ProfileReqDTO {
  name: string;
  family: string;
  email: string;
  idCard: string;
  birth_day: string;
}

export interface LoginReqDTO {
  phone: string | null;
  password: string;
}

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ValidateResDTO {
  authMode: number;
  phone: string;
}

export interface ChangePasswordReqDTO {
  code: string;
  phone: string;
  password: string;
}

export interface ProfileDTO {
  username: string;
  family: string;
  name: string;
  phone: string;
  agency: {
    name: string;
    logo: string | null;
    commission?: number;
    isManager?: boolean | null
    LicenseFileA: string | null;
    id?: number;
    LicenseFileB: string | null;
    email: string;
    address: string;
    tell: string;
    site: string;
    crewCount: number;
    necessaryPhone: string;
  }
  birthDay?: string;
  createdAt?: string;
  role?: string;
}
