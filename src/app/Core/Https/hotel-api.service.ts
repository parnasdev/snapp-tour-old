import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {CityListRequestDTO, CitySetRequestDTO} from "../Models/cityDTO";
import {Result} from "../Models/result";
import {HotelRequestDTO, HotelSetRequestDTO, SetHotelPackageDTO} from "../Models/hotelDTO";

@Injectable({
  providedIn: 'root'
})
export class HotelApiService {

  private serverControllerName = 'hotel/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  getHotels(req: HotelRequestDTO): any {
    const strUrl = this.serverControllerName + 'getHotels';


    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  add(req: HotelSetRequestDTO): any {
    const strUrl = this.serverControllerName + 'createHotel';

    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  edit(req: HotelSetRequestDTO, name: string): any {
    const strUrl = this.serverControllerName + `editHotel/${name}`;

    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  delete(name: string): any {
    const strUrl = this.serverControllerName + `deleteHotel/${name}`;

    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getHotel(name: string, isAdmin: boolean): any {
    const strUrl = this.serverControllerName + `getHotel/${name}`;
    const entity =
      {
        isAdmin
      }

    return this.http.post<Result<any>>(strUrl, entity, this.publicService.getDefaultHeaders());
  }

  getServices(name: string): any {
    const strUrl = this.serverControllerName + `getServices`;

    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getHotelPackages(req: HotelRequestDTO): any {
    const strUrl = this.serverControllerName + `getHotelPackages`;

    return this.http.post<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getHotelPackage(isAdmin: boolean, name: string): any {
    const strUrl = this.serverControllerName + `getHotelPackage/${name}`;
    const entity =
      {
        isAdmin
      }

    return this.http.post<Result<any>>(strUrl, entity, this.publicService.getDefaultHeaders());
  }

  createHotelPackage(req: SetHotelPackageDTO): any {
    const strUrl = this.serverControllerName + `createHotelPackage`;
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  editHotelPackage(req: SetHotelPackageDTO, name: string): any {
    const strUrl = this.serverControllerName + `editHotelPackage/${name}`;
    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
  deleteHotelPackage(name: string): any {
    const strUrl = this.serverControllerName + `deleteHotelPackage/${name}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
}