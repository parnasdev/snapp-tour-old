export interface PostResDTO {
  thumbnail: string;
  title: string;
  slug: string;
  user: {
    name: string;
    family: string;
  };
  description: string;
  status: string;
  createdAt: string;
}

export interface PostReqDTO {
  perPage: number;
  paginate: boolean;
  search: string | null;
  isAdmin: boolean;
  limit: number | null;
  withTrash: boolean;
}

export interface PostSetReqDTO {

}
