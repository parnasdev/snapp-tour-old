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
  faq: FaqDTO[]
  images: any[];
  description: string;
  type?: boolean;
}

export interface FaqDTO {
  question: string;
  answer: string;
}

export interface CityResponseDTO {
  name: string;
  id: number;
  type: number | boolean
  image?: string
  slug: string
  slugEn: string
  faq: FaqDTO[]
  description?: string
  images?: string[]
  nameEn?: string


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




