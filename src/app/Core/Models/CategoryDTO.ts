export interface CategoryResDTO {
  id: number
  name: string
  parent: {id: number, name: string}
  slug: string
}


export interface CategoryReqDTO {
  perPage: number;
  paginate: boolean;
  search: string | null;
  getParent: boolean;
}

export interface CategorySetReqDTO {

}
