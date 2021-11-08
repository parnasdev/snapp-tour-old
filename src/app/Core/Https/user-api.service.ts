import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {Result} from "../Models/result";
import {UserCreateReq, UserReqDTO} from "../Models/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private serverControllerName = 'user/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  getUsers(req: UserReqDTO): any {
    const strUrl = this.serverControllerName + 'getUsers';
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  getUser(userId: string): any {
    const strUrl = this.serverControllerName + `getUser/${userId}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  addUser(req: UserCreateReq): any {
    const strUrl = this.serverControllerName + `createUser`;
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  editUser(req: UserCreateReq, userId: string): any {
    const strUrl = this.serverControllerName + `editUser/${userId}`;
    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  deleteUser(userId: number): any {
    const strUrl = this.serverControllerName + `deleteUser/${userId}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getUserPermission(): any {
    const strUrl = this.serverControllerName + `getUserPermission`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getUserPermissionWithId(userId: number): any {
    const strUrl = this.serverControllerName + `getUserPermission/${userId}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
}
