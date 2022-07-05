import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentCreateDTO, CommentsDTO } from '../Models/CommentDTO';
import { Result } from '../Models/result';
import { PublicService } from '../Services/public.service';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private serverControllerName = 'comment/';

  constructor(public http: HttpClient,
    public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }
  getComments(isAdmin: boolean, id: number, type: string): any {  // type = city or post
    const strUrl = this.serverControllerName + `getComments/${id}/${type}`;
    const entity = {
      isAdmin: isAdmin
    }
    return this.http.post<Result<CommentsDTO[]>>(strUrl, entity, this.publicService.getDefaultHeaders());
  }

  deleteComment(id: number): any {
    const strUrl = this.serverControllerName + `deleteComment/${id}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
  changeStatus(status: number, id: number) {    // 0 = unApproved      1 = Approved
    const entity = {
      approved: status
    }
    const strUrl = this.serverControllerName + `updateComment/${id}`;
    return this.http.patch<Result<any>>(strUrl, entity, this.publicService.getDefaultHeaders());
  }

  replyComment(req: CommentCreateDTO, cityID: number, id: number, type: string): any {    // type = city or post
    const strUrl = this.serverControllerName + `createComment/${cityID}/${type}/${id}`;
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
  createComment(req: CommentCreateDTO, cityID: number, type: string): any {    // type = city or post
    const strUrl = this.serverControllerName + `createComment/${cityID}/${type}`;
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
}
