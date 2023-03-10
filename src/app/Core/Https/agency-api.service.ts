import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {AgencyDTO, AgencyEditDTO, AgencyListUserDTO, AgencyUserDTO} from '../Models/AgencyDTO';
import {Result} from '../Models/result';
import {PublicService} from '../Services/public.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyApiService {

  private serverControllerName = 'agency/';
  private serverControllerNameUser = 'user/agency/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
    this.serverControllerNameUser =
      environment.BACK_END_IP + this.serverControllerNameUser;
  }

  getAgencies(): any {
    const url = this.serverControllerName + `getAgencies`;
    return this.http.post<Result<AgencyDTO[]>>(
      url,
      null,
      this.publicService.getDefaultHeaders());
  }

  getAgency(id: number): any {
    const url = this.serverControllerName + `getAgency/${id}`;
    return this.http.post<Result<any>>(
      url,
      null,
      this.publicService.getDefaultHeaders());
  }
  editAgency(req: AgencyEditDTO): any {
    const url = environment.BACK_END_IP + `user/editProfile`;
    return this.http.post<Result<any>>(
      url,
      req,
      this.publicService.getDefaultHeaders());
  }

  deleteAgency(id: number): any {
    const url = this.serverControllerName + `deleteAgency/${id}`;
    return this.http.delete<Result<any>>(
      url,
      this.publicService.getDefaultHeaders());
  }

  verifyAgency(id: number, isVerify: boolean): any {
    const url = this.serverControllerName + `verifyAgency/${id}`;
    const entity = {
      verify: isVerify
    }
    return this.http.post<Result<any>>(
      url,
      entity,
      this.publicService.getDefaultHeaders());
  }

  // user api
  getUsers(): any {
    const url = this.serverControllerNameUser + `getUsers`;
    return this.http.post<Result<AgencyListUserDTO[]>>(
      url,
      null,
      this.publicService.getDefaultHeaders());
  }

  getUser(id: number): any {
    const url = this.serverControllerNameUser + `getUser/${id}`;
    return this.http.get<Result<AgencyDTO[]>>(
      url,
      this.publicService.getDefaultHeaders());
  }

  editUser(req: AgencyUserDTO, id: number): any {
    const url = this.serverControllerNameUser + `editUser/${id}`;
    return this.http.patch<Result<AgencyDTO[]>>(
      url,
      req,
      this.publicService.getDefaultHeaders());
  }

  createUser(req: AgencyUserDTO): any {
    const url = this.serverControllerNameUser + `createUser`;
    return this.http.post<Result<AgencyDTO[]>>(
      url,
      req,
      this.publicService.getDefaultHeaders());
  }

}
