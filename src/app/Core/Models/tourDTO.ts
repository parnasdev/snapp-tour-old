export interface TourListRequestDTO {
  perPage: number;
  paginate: boolean;
  search: string;
  city: string | null;
  type: number

}

export interface TourListResDTO {
  title: string;
  createdAt: string;
  dayNum: number;
  endCity: string;
  expireDate: string;
  nightNum: number;
  offered: string;
  slug: string;
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

export interface TourPackageDTO {
  parent: null;
  user_id: null;
  hotel_id: string;
  services: number;
  rate: number;
  discounts: DiscountsDTO;
  prices: PricesDTO;
  status: string;
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
  ADLRate: number;
  age: string;
}

export interface TourTransferDTO {
  transfer_id: string;
  dateTime: string;
  type: string;
}
