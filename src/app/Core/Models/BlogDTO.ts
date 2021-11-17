import {CategoryResDTO} from "./CategoryDTO";

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
  body: string
  categories: CategoryResDTO[]
  tags: string[]
  viewCount: 0
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
  thumbnail: string;
  title: string;
  slug: string;
  body: string;
  description: string;
  tags: string[];
  status: string;
  categories: number[];
}
