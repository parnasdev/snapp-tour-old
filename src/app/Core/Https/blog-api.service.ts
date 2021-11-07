import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {TourListRequestDTO, TourListResDTO, TourSetRequestDTO} from "../Models/tourDTO";
import {Result} from "../Models/result";
import {PostReqDTO, PostResDTO, PostSetReqDTO} from "../Models/BlogDTO";

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  private serverControllerName = 'post/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  createPost(req: PostSetReqDTO): any {
    const strUrl = this.serverControllerName + 'createPost';
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  getPosts(req: PostReqDTO): any {
    const strUrl = this.serverControllerName + 'getPosts';
    return this.http.post<Result<PostResDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  editPost(req: PostSetReqDTO,tour:any): any {
    const strUrl = this.serverControllerName + `editPost/${tour}`;
    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  deletePost(slug: string): any {
    const strUrl = this.serverControllerName + `deletePost/${slug}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getPost(title:string): any {
    const strUrl = this.serverControllerName + `getPost/${title}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
}
