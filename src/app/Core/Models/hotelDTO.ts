import {CityResponseDTO} from "./cityDTO";
import {TourListResDTO} from "./tourDTO";

export interface HotelSetRequestDTO {
  name: string;
  nameEn: string;
  slug: string;
  slugEn: string;
  city_id: string;
  mediaLink: MediaLink[]
  stars: number;
  location: string;
  address: string;
  coordinate: {
    lat: number;
    lng: number
  };
  thumbnail: string;
  images: any[];
  body: string;
  services: [
    {
      name: string;
      ids: string[]
    }
  ];
  status: string
}

export interface MediaLink {
  name: string;
  link: string;
}

export interface hotelInfoDTO {
  name: string;
  city: CityResponseDTO;
  nameEn: string;
  stars: string;
  location: string;
  address: string;
  coordinate: { lat: number, lng: number }
  images: string[];
  mediaLink: MediaLink[]

  thumbnail: string;
  body: string;
  services: ServicesDTO[];
  status: string;
  phone: string;
  tours: TourListResDTO[];
}

export interface HotelListRes {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  slugEn: string;
  stars: string;
  thumbnail: string;
  city: string;
  location: string;
}

export interface HotelRequestDTO {
  isAdmin: boolean
  paginate: boolean
  city: number | null;
  search: string | null;
}

export interface SetHotelPackageDTO {
  title: string;
  slug: string;
  expire: string;
  city_id: string;
  transferRate: number;
  transferRateType: number;
  status: string;
  packages: PackageDTO[]
}

export interface PackageDTO {
  parent: any;
  user_id: number;
  hotel_id: string;
  services: number;
  rate: number;
  discounts: {
    twin: number;
    single: number;
    cwb: number;
    cnb: number
  };
  "prices": {
    twin: number;
    triple: number
    quad: number
    single: number;
    ADLRate: number
    cwb: number;
    cnb: number;
    age: string
  },
  "status": string

}

export interface HotelListResponseDTO {
  id: number
  name: string
  nameEn: string
  slug: string
  keyword: string
  slugEn: string
  stars: string
  thumbnail: string
  city: string
  location: string

}

export interface ServiceDTO {
  id: number;
  name: string;
  checked?: boolean;
}

export interface ServicesDTO {
  name: string;
  ids: string[]
  services: ServiceDTO[]
}
