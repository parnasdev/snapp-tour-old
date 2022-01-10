import {FaqDTO} from "./cityDTO";

export interface GetServiceRequestDTO {
  id: number
  name: string
}

export interface SettingDTO {
  address: string;
  consoleGoogle: string;
  description: string;
  descriptionFooter: string;
  email: string;
  favicon: string;
  location: string;
  logo: string;
  faq: any
  logoFooter: string;
  metaTags: string;
  namads: string;
  socialLinks: string;
  tel: string;
  title: string;
  whatsapp: string;
  banners?: string;
  thumbnail?: string;
}
