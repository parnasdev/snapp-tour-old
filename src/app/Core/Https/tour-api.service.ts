import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {Result} from "../Models/result";
import {TourListRequestDTO, TourSetRequestDTO} from "../Models/tourDTO";

@Injectable({
  providedIn: 'root'
})
export class TourApiService {


  private serverControllerName = 'tour/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  createTour(req: TourSetRequestDTO): any {
    const strUrl = this.serverControllerName + 'createTour';


    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
  getTours(req: TourListRequestDTO): any {
    const strUrl = this.serverControllerName + 'getTours';


    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
  editTour(req: TourSetRequestDTO,tour:any): any {
    const strUrl = this.serverControllerName + `editTour/${tour}`;


    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  deleteTour(tour: any): any {
    const strUrl = this.serverControllerName + `deleteTour/${tour}`;


    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
  getTour(tour:any): any {
    const strUrl = this.serverControllerName + `getTour/${tour}`;


    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

}