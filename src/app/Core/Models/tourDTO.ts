import {CityDTO} from "./cityDTO";

export interface TourListRequestDTO {
  perPage: number;
  paginate: boolean;
  search: string;
  isAdmin?: boolean | null;
  city: string | null;
  type: number | null;
}

export interface TourListResDTO {
  title: string;
  createdAt: string;
  dayNum: number;
  endCity: string;
  expireDate: string;
  minPrice: string;
  nightNum: number;
  offered: string;
  slug: string;
  transfers: TourTransferDTO[];
  stCity: string;
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
  defineTour: number;
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
}

export interface TourPackageDTO {
  parent: null;
  user_id: null;
  id: number
  hotel_id: string;
  services: {
    id: number;
    name: string;
  };
  hotel: HotelDTO;
  rate: { id: number, name: string };
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
  images: any[];
  description: string;
  type: number
}
