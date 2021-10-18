import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {Result} from "../Models/result";
import {AuthRequestDTO, LoginResponseDTO, ValidateResponseDTO} from "../Models/AuthDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private serverControllerName = 'auth/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  logout(): any {
    const strUrl = this.serverControllerName + 'logout';

    return this.http.post<Result<boolean>>(strUrl, null, this.publicService.getDefaultHeaders());
  }

  validation(req: AuthRequestDTO): any {
    const strUrl = this.serverControllerName + 'validation';
    return this.http.post<Result<ValidateResponseDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  login(req: AuthRequestDTO): any {
    const strUrl = this.serverControllerName + 'login';

    return this.http.post<Result<LoginResponseDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  changePassword(req: AuthRequestDTO): any {
    const strUrl = this.serverControllerName + 'changePassword';

    return this.http.post<Result<boolean>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  sendSMS(req: AuthRequestDTO): any {
    const strUrl = this.serverControllerName + 'sendSMS';

    return this.http.post<Result<boolean>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  register(req: AuthRequestDTO): any {
    const strUrl = this.serverControllerName + 'register';

    return this.http.post<Result<boolean>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

}
