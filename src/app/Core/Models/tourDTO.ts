export interface TourListRequestDTO {
  perPage: number;
  paginate: boolean;
  search: string;
  city: any;
  type : number

}

export interface TourSetRequestDTO {
  title:              string;
  stCity_id:          string;
  endCity_id:         string;
  nightNum:           number;
  dayNum:             number;
  TransferType:       number;
  transfer:           TourTransferDTO[];
  enDate:             string;
  expireDate:         string;
  CHDFlightRate:      number;
  defineTour:         number;
  euroRate:           number;
  dollarRate:         number;
  AEDRate:            number;
  visaRate:           number;
  visaPriceType:      number;
  insuranceRate:      number;
  transferPriceType:  number;
  transferRate:       number;
  insurancePriceType: number;
  services:           string;
  documents:          string;
  description:        string;
  status:             string;
  packages:           TourPackageDTO[];
}

export interface TourPackageDTO {
  parent:    null;
  user_id:   null;
  hotel_id:  string;
  services:  number;
  rate:      number;
  discounts: DiscountsDTO;
  prices:    PricesDTO;
  status:    string;
}

export interface DiscountsDTO {
  twin:   number;
  single: number;
  cwb:    number;
  cnb:    number;
}

export interface PricesDTO {
  twin:    number;
  single:  number;
  cwb:     number;
  cnb:     number;
  ADLRate: number;
  age:     string;
}

export interface TourTransferDTO {
  transfer_id: string;
  dateTime:    string;
  type:        string;
}
