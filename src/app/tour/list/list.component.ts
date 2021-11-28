import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CityInfoResDTO, CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {CityApiService} from "../../Core/Https/city-api.service";

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
    sortByDate: false,
    perPage: 20,
    type: null
  };
  tours: TourListResDTO[] = [];
  loading = false;
  city: string | null = '';
  p = 1
  cities: CityResponseDTO[] = []
  cityInfo: CityInfoResDTO = {
    description: '',
    id: 0,
    images: [],
    slugEn: '',
    name: '',
    nameEn: '',
    slug: '',
    type: false,
  };
  sortByDate = false;

  constructor(public tourApiService: TourApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public errorService: ErrorsService,
              public cityApi: CityApiService,
              public router: Router,
              public message: MessageService) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.getData()
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // this.getData()
  }

  getData(): void {
    this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
    this.getCities()
    if (this.city) {
      this.getCity();
    } else {
      this.getTours()
    }

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

  citySelected(city: CityResponseDTO): void {
    this.cityInfo = {
      description: '',
      id: city.id,
      images: [],
      slugEn: city.slugEn,
      name: city.name,
      nameEn: '',
      slug: city.slug,
      type: city.type !== 1,
    }
  }

  getTours(): void {
    this.loading = true;
    this.tourReq = {
      city: this.cityInfo.name === '' ? null : this.cityInfo.name,
      isAdmin: false,
      sortByDate: this.sortByDate,
      paginate: true,
      search: null,
      perPage: 20,
      type: null
    };
    this.tourApiService.getTours(this.tourReq, this.p).subscribe((res: any) => {
      this.loading = false
      if (res.isDone) {
        this.tours = res.data
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  getCity(): void {
    if (this.city) {
      this.cityApi.getCity(this.city).subscribe((res: any) => {
        if (res.isDone) {
          this.cityInfo = res.data
          this.getTours();

        } else {

        }
      }, (error: any) => {

      })
    }
  }

  search(): void {
    this.router.navigateByUrl(`/tours/${this.cityInfo.slugEn}`);
  }
}
