import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {Result} from "../Models/result";

@Injectable({
  providedIn: 'root'
})

export class SettingApiService {

  private serverControllerName = 'setting/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  getSetting(): any {
    const strUrl = this.serverControllerName + 'getSetting';
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  changeSetting(): any {
    const strUrl = this.serverControllerName + 'changeSetting';
    return this.http.post<Result<any>>(strUrl, null, this.publicService.getDefaultHeaders());
  }
}
