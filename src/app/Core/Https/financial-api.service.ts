import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExportReservesReqDTO } from '../Models/financialDTO';
import { Result } from '../Models/result';
import { ReserveListReqDTO } from '../Models/tourDTO';
import { PublicService } from '../Services/public.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialApiService {


  private serverControllerName = 'reserve';

  constructor(public http: HttpClient,
    public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }

  getPaidReserves(req: ReserveListReqDTO, page: number): any {
    const address = page ? `/getReserves?page=${page}` : '/getReserves'
    const strUrl =  this.serverControllerName + address;

    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  export(req: ExportReservesReqDTO): any {
    const strUrl = this.serverControllerName + '/export';
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }
}
