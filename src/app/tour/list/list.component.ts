import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {CityApiService} from "../../Core/Https/city-api.service";
import {FormControl, Validators} from "@angular/forms";

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
    month: null,
    sortByDate: false,
    perPage: 20,
    type: null
  };

  tours: TourListResDTO[] = [];
  loading = false;
  cityFC = new FormControl(null, Validators.required);
  city = ''
  p = 1
  cities: CityResponseDTO[] = []
  cityInfo: CityResponseDTO = {
    description: '',
    id: 0,
    images: [],
    slugEn: '',
    name: '',
    nameEn: '',
    slug: '',
    type: 1,
  };
  sortByDate = false;
  orderId = 0;

  months = [
    {id: 0,title: 'چه ماهی می خواهید سفر کنید ؟'},
    {id: 4,title: 'فروردین'},
    {id: 5,title: 'اردیبهشت'},
    {id: 6,title: 'خرداد'},
    {id: 7,title: 'تیر'},
    {id: 8,title: 'مرداد'},
    {id: 9,title: 'شهریور'},
    {id: 10,title: 'مهر'},
    {id: 11,title: 'آبان'},
    {id: 12,title: 'آذر'},
    {id: 1,title: 'دی'},
    {id: 2,title: 'بهمن'},
    {id: 3,title: 'اسفند'},
  ]
  monthFC = new FormControl(this.months[0])
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

  }

  getData(): void {
    // @ts-ignore
    this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
    this.route.queryParams.subscribe(params => {
      const month = params['month'];
      if (month) {
        this.monthFC.setValue(this.months.find(x => x.title === month))
      }
    })
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
        this.cityFC.setValue(this.cities.find(x => x.slugEn === this.city))
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  citySelected(city: CityResponseDTO): void {
    if (city) {
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
    }else {
      this.cityInfo = {
        description: '',
        id: 0,
        images: [],
        slugEn: '',
        name: '',
        nameEn: '',
        slug: '',
        type: false,
      }
    }

    this.cityFC.setValue(city)
  }

  getTours(): void {
    this.loading = true;
    this.tourReq = {
      city: this.cityInfo.name === '' ? null : this.cityInfo.name,
      isAdmin: false,
      sortByDate: this.sortByDate,
      paginate: true,
      search: null,
      month: this.monthFC.value.id === 0 ? null : this.monthFC.value.id,
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

  search() {
    if (this.monthFC.value.id === 0 && this.cityFC.invalid) {
      this.router.navigate([`/tours`])
    } else {
      if (this.monthFC.value.id === 0 && this.cityFC.valid) {
        this.router.navigate([`/tours/${this.cityFC.value.slugEn}`])
      } else if (this.monthFC.value.id !== 0 && this.cityFC.invalid) {
        this.router.navigate([`/tours/`], {queryParams: {month: this.monthFC.value.title}})
      } else {
        this.router.navigate([`/tours/${this.cityFC.value.slugEn}`], {queryParams: {month: this.monthFC.value.title}})
      }
    }
  }

  getSortByDate() {
    this.orderId = this.sortByDate ? this.orderId : 0;
  }
}
