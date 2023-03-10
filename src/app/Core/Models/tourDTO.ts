import { CityDTO, CityResponseDTO } from "./cityDTO";
import { RoomTypePriceDTO } from "./roomTypeDTO";


export interface TourListRequestDTO {
  origin: string | null;
  dest: string| null;
  stDate: string | null;
  night: number | null;
  status: string | null;
  perPage: number;
  paginate: boolean;
  search: string | null;
  isAdmin?: boolean | null;
  month?: string | null;
  type: number | null;
  sortByDate: boolean;
  limit?: number;
  offered?: boolean;
}

export interface TourListResDTO {
  title: string;
  createdAt: string;
  id?: number
  dayNum: number;
  endCity: CityTourInfoDTO;
  expireDate: string;
  minPrice: string;
  nightNum: number;
  offered: string;
  slug: string;
  transfers: TourTransferDTO[];
  stCity: CityDTO;
  status: string;
  user: {
    name: string;
    family: string;
  };
  viewCount: 0;
}

export interface TourSetRequestDTO {
  title: string;
  slug: string;
  stCity_id: string;
  endCity_id: string;
  nightNum: number;
  dayNum: number;
  offered: boolean;
  transferType: number;
  transfers: TourTransferDTO[];
  enDate: string;
  stDate: string
  expireDate: string;
  type: boolean
  CHDFlightRate: number;
  ADLFlightRate: number;
  defineTour: boolean;
  euroRate: number;
  dollarRate: number;
  AEDRate: number;
  visaRate: number;
  visaPriceType: number;
  insuranceRate: number;
  transferPriceType: number;
  transferRate: number;
  insurancePriceType: number;
  services: string;
  documents: string;
  description: string;
  status: string;
  packages: TourPackageDTO[];
}

export interface TourInfoDTO {
  AEDRate: number;
  CHDFlightRate: string;
  ADLFlightRate: string;
  TransferType: string;
  dayNum: number;
  minPrice: string
  defineTour: boolean;
  description: string;
  documents: string;
  dollarRate: number;
  enDate: string;
  endCity: CityTourInfoDTO;
  euroRate: number;
  expireDate: string;
  insurancePriceType: number;
  insuranceRate: number;
  nightNum: number;
  offered: null
  packages: TourPackageDTO[];
  services: string;
  slug: string;
  stCity: CityTourInfoDTO;
  stDate: string;
  status: string;
  title: string;
  transfers: TourTransferDTO[];
  transferPriceType: number;
  transferRate: number;
  type: boolean;
  user: {
    name: string;
    family: string;
  }
  visaPriceType: number;
  visaRate: number;
  tours: TourListResDTO[];
}

export interface TourPackageDTO {
  parent: null;
  user_id: null;
  offered: boolean;
  order_item: number;
  id: number;
  hotel_id: string;
  services: {
    id: number;
    name: string;
  };
  hotel: HotelDTO;
  rate: { id: number, name: string };
  roomType: RoomTypePriceDTO[];
  discounts: DiscountsDTO;
  prices: PricesDTO;
  status: string;
}

export interface HotelDTO {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  slugEn: string;
  stars: string;
  thumbnail: string;
  location: string;
}

export interface DiscountsDTO {
  twin: number;
  single: number;
  cwb: number;
  cnb: number;
}

export interface PricesDTO {
  twin: string;
  single: string;
  cwb: string;
  cnb: string;
  quad: string;
  triple: string;
  twinCapacity: string;
  singleCapacity: string;
  cwbCapacity: string;
  quadCapacity: string;
  tripleCapacity: string;
  twinRate: string;
  singleRate: string;
  cwbRate: string;
  cnbRate: string;
  quadRate: string;
  roomType: RoomTypePriceDTO[];
  tripleRate: string;
  ADLRate: string;
  age: string;
  pool: boolean;
}

export interface TourTransferDTO {
  transfer_id: string;
  dateTime: string;
  transfer?: string;
  type: string;
}

export interface CityTourInfoDTO {
  id: number;
  name: string;
  slug: string;
  slugEn: string;
  images: any[];
  description: string;
  type: boolean
}

export interface ReserveReqDTO {
  package_id: number | null;
  phone?: string;
  count?: number;
  month?: string;
  city_id?: string;
  noPackage?: boolean;
}

export interface ReserveListReqDTO {
  perPage?: number
  paginate: boolean
}

export interface ReserveListResDTO {
  id: number;
  count: number;
  package: ReservePackageDTO;
  phone: string;
  city: CityResponseDTO;
  createdAt: string;
  month: string;
  name: string;
  status: string | null;
}


export interface ReservePackageDTO {
  id: number;
  tour: Tour;
  hotel: HotelDTO;
  services: RateDTO;
  rate: RateDTO;
  discounts: DiscountsDTO;
  prices: PricesDTO;
  status: string;
  order_item: number;
  offered: boolean;
}

export interface RateDTO {
  id: number;
  name: any;
}

export interface Tour {
  dayNum:  number | string
  enDate: string
  endCity: CityResponseDTO
  nightNum: number
  slug: string
  stCity: CityResponseDTO
  stDate : string
  status: string
   title : string
  transfers : TourTransferDTO[]
}


export interface DatesResDTO {
  date: string;
  nights: number[];
}



export interface ReserveInfoDTO {
  id:         number;
  package:    ReservePackageDTO;
  user:       null;
  name:       null;
  month:      null;
  city:       null;
  phone:      string;
  count:      number;
  status:     string;
  passengers: null;
  bill:       null;
  createdAt:  Date;
  cache:      null;
}


