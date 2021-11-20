export interface RoomTypeReqDTO {
  perPage: number;
  paginate: boolean;
}

export interface RoomTypePriceDTO {
  name: string;
  price: number;
}

export interface RoomTypeListDTO {
  id: number;
  name: string;
  label: string;
  isDefault: boolean;
}

export interface RoomTypeSetDTO {
  name: string;
  label: number;
}