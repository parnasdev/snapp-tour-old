export interface CityListRequestDTO {
  type: boolean
  perPage: 20
  search: null
  hasTour: boolean
  hasHotel: boolean
}

export interface CitySetRequestDTO {
  name?: string;
  data: {
    images: any[],
    description: string
  },
  type?: boolean
}

export interface CityResponseDTO {
  name: string;
  id: number;
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




