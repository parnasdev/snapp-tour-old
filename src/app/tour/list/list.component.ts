import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {CityApiService} from "../../Core/Https/city-api.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tourReq: TourListRequestDTO = {
    city: null,
    isAdmin: false,
    paginate: true,
    search: null,
    perPage: 20,
    type: null
  };
  tours: TourListResDTO[] = [];
  loading = false;
  city: string | null = '';
  p = 1
  cities: CityResponseDTO[] = []
  cityFC = new FormControl();

  constructor(public tourApiService: TourApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public errorService: ErrorsService,
              public cityApi: CityApiService,
              public router: Router,
              public message: MessageService) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
        this.tourReq.city = this.city ? this.city : null;
        this.getTours();

      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
    this.tourReq.city = this.city ? this.city : null;
    this.getTours();
    this.getCities()
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: false,
      hasTour: true,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  citySelected(city: any): void {
    console.log(city)
    this.cityFC.setValue(city);
  }

  getTours(): void {
    this.loading = true;
    this.tourApiService.getTours(this.tourReq, this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  search(): void {
    this.router.navigateByUrl(`/tours/${this.cityFC.value.nameEn}`).then(
    )
  }
}
