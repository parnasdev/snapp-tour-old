export interface HotelSetRequestDTO {
  name: string;
  nameEn: string;
  slug: string;
  slugEn: string;
  city_id: string;
  stars: 3;
  location: string;
  address: string;
  coordinate: {
    lat: number;
    lng: number
  };
  thumbnail: string;
  images: [];
  body: string;
  services: [
    {
      name: string;
      ids: string[]
    }
  ];
  status: string
}

export interface HotelRequestDTO {
  isAdmin: boolean
  paginate: boolean
  city: number
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
    single: number;
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
  slugEn: string
  stars: string
  thumbnail: string
}
