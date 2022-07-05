import { UserDTO } from "./AuthDTO";

export interface CommentCreateDTO {
    name?: string;
    email: string;
    body: string;
    rate: number;
}

export interface CommentsDTO {
    id: number;
    user: UserDTO;
    name: string;
    email: number;
    body: string;
    approved: number;
    rate: number;
    commentTable: number;
    createdAt: string;
    children: any[];
}
