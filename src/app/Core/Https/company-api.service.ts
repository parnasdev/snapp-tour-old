import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {HotelRequestDTO} from "../Models/hotelDTO";
import {Result} from "../Models/result";
import {CompanySetDTO} from "../Models/companyDTO";

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  private serverControllerName = 'company/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  editCompany(req: CompanySetDTO): any {
    const strUrl = this.serverControllerName + 'editCompany';


    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  getCompany(): any {
    const strUrl = this.serverControllerName + 'getCompany';

    return this.http.post<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

}
