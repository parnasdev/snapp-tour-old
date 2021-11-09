export interface CityListRequestDTO {
  type: boolean | null;
  perPage: number;
  search: string | null;
  hasTour: boolean;
  hasHotel: boolean;
}

export interface CitySetRequestDTO {
  name?: string;
  nameEn: string;
  images: any[];
  description: string;
  type?: boolean;
}

export interface CityResponseDTO {
  name: string;
  id: number;
  type: number
}

export interface MapCityResponseDTO {
  id: number;
  name: string;
  cities: CityDTO[];
}

export interface CityDTO {
  id: number;
  coordinates: number[];
  name: string;
}




