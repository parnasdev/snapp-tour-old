import {CityDTO, CityResponseDTO} from "./cityDTO";
import {RoomTypePriceDTO, RoomTypeSetDTO} from "./roomTypeDTO";
import {PackageDTO} from "./hotelDTO";

export interface TourListRequestDTO {
  perPage: number;
  paginate: boolean;
  search: string | null;
  isAdmin?: boolean | null;
  city: string | null;
  type: number | null;
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
  stCity_id: string;
  endCity_id: string;
  nightNum: number;
  dayNum: number;
  offered: boolean;
  TransferType: number;
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
  type: number;
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
  twin: number;
  single: number;
  cwb: number;
  cnb: number;
  quad: string;
  triple: string;
  twinRate: number;
  singleRate: number;
  cwbRate: number;
  cnbRate: number;
  quadRate: string;
  tripleRate: string;
  ADLRate: number;
  age: string;
  roomType: RoomTypePriceDTO[];
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
  type: number
}

export interface ReserveReqDTO {
  package_id: number
  phone: string
  count: number
}
export interface ReserveListReqDTO {
  id: number
  perPage?: number
  paginate: boolean
}
export interface ReserveListResDTO {
  count: number
  package: ReservePackageDTO
  phone: string
}


export interface ReservePackageDTO {
  id:         number;
  tour:       Tour;
  hotel:      HotelDTO;
  services:   RateDTO;
  rate:       RateDTO;
  discounts:  DiscountsDTO;
  prices:     PricesDTO;
  status:     string;
  order_item: number;
  offered:    boolean;
}
export interface RateDTO {
  id:   number;
  name: any;
}
export interface Tour {
  title: string;
  slug:  string;
  endCity: CityResponseDTO
}
