import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {CompanySetDTO} from "../Models/companyDTO";
import {Result} from "../Models/result";

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  private serverControllerName = 'common/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  getRates(): any {
    const strUrl = this.serverControllerName + 'getRates';
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getRoles(): any {
    const strUrl = this.serverControllerName + 'getRoles';
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getServices(): any {
    const strUrl = this.serverControllerName + 'getServices';
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getTransferTypes(): any {
    const strUrl = this.serverControllerName + 'getTransferTypes';
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
}
