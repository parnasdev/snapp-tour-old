import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {Result} from "../Models/result";
import {
  ReserveListReqDTO, ReserveListResDTO,
  ReserveReqDTO,
  TourListRequestDTO,
  TourListResDTO,
  TourSetRequestDTO
} from "../Models/tourDTO";

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

  getTours(req: TourListRequestDTO, pageNum?: number): any {
    const address = pageNum ? `getTours?page=${pageNum}` : 'getTours'
    const strUrl = this.serverControllerName + address;

    return this.http.post<Result<TourListResDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  editTour(req: TourSetRequestDTO, tour: any): any {
    const strUrl = this.serverControllerName + `editTour/${tour}`;
    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  deleteTour(slug: string): any {
    const strUrl = this.serverControllerName + `deleteTour/${slug}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getTour(title: string): any {
    const strUrl = this.serverControllerName + `getTour/${title}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  exportTour(title: string): any {
    const strUrl = this.serverControllerName + `export/${title}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getLogs(id: number): any {
    const strUrl = environment.BACK_END_IP + `log/tours/${id}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  reserve(req: ReserveReqDTO): any {
    const strUrl = environment.BACK_END_IP + `reserve/createReserve`;
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  getReserves(req: ReserveListReqDTO): any {
    const strUrl = environment.BACK_END_IP + `reserve/getReserves/${req.id}`;
    return this.http.post<Result<ReserveListResDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
}
