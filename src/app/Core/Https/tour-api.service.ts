import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PublicService } from "../Services/public.service";
import { environment } from "../../../environments/environment";
import { Result } from "../Models/result";
import {
  DatesResDTO,
  EditReserveReq,
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

  getTour(title: string, view: boolean = false): any {
    let strUrl = ''
    if (view) {
      strUrl = this.serverControllerName + `getTour/${title}?view=true`;
    } else {
      strUrl = this.serverControllerName + `getTour/${title}`;
    }
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
  getReserve(reserveID:string): any {
    const strUrl = environment.BACK_END_IP + `reserve/getReserve/${reserveID}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
  getReserveLogs(id: number): any {
    const strUrl = environment.BACK_END_IP + `log/reserves/${id}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  addLogMessage(id: number, message: string): any {
    const strUrl = environment.BACK_END_IP + `reserve/addMessage/${id}`;
    return this.http.post<Result<any>>(strUrl,
      { message: message },
      this.publicService.getDefaultHeaders());
  }

  editReserve(editReserveReq: EditReserveReq, ref_code: string): any {
    const strUrl = environment.BACK_END_IP + `reserve/editReserve/${ref_code}`;
    return this.http.post<Result<any>>(strUrl, 
        editReserveReq
    , this.publicService.getDefaultHeaders());
  }

  changeStatus(status: string | null, ref_code: string | null): any {
    const strUrl = environment.BACK_END_IP + `reserve/changeStatusReserve/${ref_code}`;
    return this.http.post<Result<any>>(strUrl, {
      status
    }, this.publicService.getDefaultHeaders());
  }

  getReserves(req: ReserveListReqDTO, pageNum: number): any {
    const address = pageNum ? `reserve/getReserves?page=${pageNum}` : 'reserve/getReserves'
    const strUrl = environment.BACK_END_IP + address;
    return this.http.post<Result<ReserveListResDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  getVoucher(refrence: string): any {
    const strUrl = environment.BACK_END_IP + `reserve/getVoucher/${refrence}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  generateSlug(title: string): any {
    const strUrl = this.serverControllerName + `generateSlug`;
    const entity = {
      title
    }
    return this.http.post<Result<string>>(strUrl, entity, this.publicService.getDefaultHeaders());
  }

  getDates(originEn: string, destEn: string): any {
    const strUrl = this.serverControllerName + `getDates/${originEn}/${destEn}`;
    return this.http.get<Result<DatesResDTO[]>>(strUrl, this.publicService.getDefaultHeaders());
  }

  payTransaction(transactionId: string): any {
    const strUrl =  environment.BACK_END_IP + `transaction/pay/${transactionId}`;
    return this.http.get<Result<any[]>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getTransaction(transactionId: string | null): any {
    const strUrl =  environment.BACK_END_IP + `transaction/getTransaction/${transactionId}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

}
