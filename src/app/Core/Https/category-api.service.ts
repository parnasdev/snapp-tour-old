import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublicService} from "../Services/public.service";
import {environment} from "../../../environments/environment";
import {Result} from "../Models/result";
import {CategoryReqDTO, CategoryResDTO, CategorySetReqDTO} from "../Models/CategoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  private serverControllerName = 'category/';

  constructor(public http: HttpClient,
              public publicService: PublicService) {
    this.serverControllerName =
      environment.BACK_END_IP + this.serverControllerName;
  }
  getCategories(req: CategoryReqDTO): any {
    const strUrl = this.serverControllerName + 'getCategories';
    return this.http.post<Result<CategoryResDTO>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  createCategory(req: CategoryReqDTO): any {
    const strUrl = this.serverControllerName + 'createCategory';
    return this.http.post<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }



  editCategory(req: CategorySetReqDTO,categoryName:any): any {
    const strUrl = this.serverControllerName + `editCategory/${categoryName}`;
    return this.http.patch<Result<any>>(strUrl, req, this.publicService.getDefaultHeaders());
  }

  deleteCategory(slug: string): any {
    const strUrl = this.serverControllerName + `deleteCategory/${slug}`;
    return this.http.delete<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }

  getCategory(slug:string): any {
    const strUrl = this.serverControllerName + `getCategory/${slug}`;
    return this.http.get<Result<any>>(strUrl, this.publicService.getDefaultHeaders());
  }
}
