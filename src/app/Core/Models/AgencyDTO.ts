import { UploadResDTO } from "src/app/agencies/edit/edit.component"

export interface AgencyDTO {
  id: number
  name: string
  users: AgencyListUserDTO[]
  verify: boolean
  LicenseFileA: string | null
  LicenseFileB: string | null
  address: string
  crewCount:number
  email: string
  logo: string
  necessaryPhone: string
  tell: string;

  site: string
  user?: {name: string, family: string}

}

export interface AgencyListUserDTO {
  agency: AgencyDTO
  birthDay: string
  createdAt: string
  family: string
  id: number
  name: string
  email: string
  phone: string
  role: string
  username: string
}

export interface AgencyUserDTO {
  name: string,
  family: string
  id?: number;
  phone: string
  password: string
}
export interface AgencyEditReqDTO {
    username: string;
    family: string;
    name: string;
    phone: string;
    city: number;
    id_code: string;
    gender: string;
    email:string;
    agency: {
      name: string;
      logo: string;
      isManager: null;
      LicenseFileA: string;
      id: number;
      LicenseFileB:  string;
      email: string;
      address: string;
      tell: string;
      site: string;
      necessaryPhone: string;
    };
    birthDay: string;
    createdAt: string;
    role: string;
}

export interface AgencyEditDTO {
  username: string;
  family: string;
  name: string;
  phone: string;
  city: number;
  id_code: string;
  gender: string;
  email:string;
  agency: {
    name: string;
    logo: string;
    isManager: null;
    LicenseFileA: UploadResDTO | string;
    id: number;
    LicenseFileB: UploadResDTO | string;
    email: string;
    address: string;
    tell: string;
    site: string;
    necessaryPhone: string;
  };
  birthDay: string;
  createdAt: string;
  role: string;
}