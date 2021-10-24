export interface CityListRequestDTO {
  type: true
  perPage: 20
  search: null
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




