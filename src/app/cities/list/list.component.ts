import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {Router} from "@angular/router";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cityReq!: CityListRequestDTO;
  cities: CityResponseDTO[] = [];
  isLoading = false;

  constructor(public api: CityApiService,
              public router: Router,
              public checkErrorService: CheckErrorService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.getCities()
  }

  getCities(): void {
    this.setReq()
    this.api.getCities(this.cityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data
      } else {
        this.message.custom(res.message);
      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  setReq(): void {
    this.cityReq = {
      perPage: 20,
      search: null,
      type: false,
      hasTour: false,
      hasHotel: false
    }
  }

  remove(name: string): void {
    this.api.remove(name).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  edit(name: string): void {
    this.router.navigateByUrl(`/panel/cities/set/${name}`)
  }
}
