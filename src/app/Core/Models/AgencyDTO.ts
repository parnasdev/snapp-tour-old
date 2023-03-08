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
  commissions: number[]
  commission?: number
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
export interface AgencyEditDTO {
  name: string
  logo: string | null
  LicenseFileA: string | null
  id: number
  commission: number;
  LicenseFileB: string | null
  email: string
  address: string
  tell: string
  site: string
  crewCount: number
  necessaryPhone: string
}
