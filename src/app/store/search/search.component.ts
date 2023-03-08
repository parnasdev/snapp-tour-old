import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../Core/Services/errors.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {MessageService} from "../../Core/Services/message.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {Router} from "@angular/router";
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';

@Component({
  selector: 'prs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  rnd = 0
isMobile = false;
  cities: CityResponseDTO[] = [];
  cityReq!: CityListRequestDTO;
  cityFC = new FormControl(null, Validators.required);
  dateFC = new FormControl(new Date());
  Loading = false;
  date = '';
  images = [
    './assets/img/bg/bg-snapptour-1.jpg',
    './assets/img/bg/bg-snapptour-2.jpg',
    './assets/img/bg/bg-snapptour-3.jpg',
    './assets/img/bg/bg-snapptour-4.jpg',
    './assets/img/bg/bg-snapptour-5.jpg',
    './assets/img/bg/bg-snapptour-6.jpg',
    './assets/img/bg/bg-snapptour-7.jpg',
    './assets/img/bg/bg-snapptour-8.jpg',
    './assets/img/bg/bg-snapptour-9.jpg',
    './assets/img/bg/bg-snapptour-10.jpg',
    './assets/img/bg/bg-snapptour-11.jpg',
    './assets/img/bg/bg-snapptour-12.jpg',
    './assets/img/bg/bg-snapptour-13.jpg',
    './assets/img/bg/bg-snapptour-14.jpg',
    './assets/img/bg/bg-snapptour-15.jpg',
  ]
  months = [
    {id: 0, title: 'چه ماهی می خواهید سفر کنید ؟'},
    {id: 4, title: 'فروردین'},
    {id: 5, title: 'اردیبهشت'},
    {id: 6, title: 'خرداد'},
    {id: 7, title: 'تیر'},
    {id: 8, title: 'مرداد'},
    {id: 9, title: 'شهریور'},
    {id: 10, title: 'مهر'},
    {id: 11, title: 'آبان'},
    {id: 12, title: 'آذر'},
    {id: 1, title: 'دی'},
    {id: 2, title: 'بهمن'},
    {id: 3, title: 'اسفند'},
  ]
  monthFC = new FormControl(this.months[0])

  constructor(public cityApiService: CityApiService,
              public router: Router,
              public checkErrorService: CheckErrorService,
              public mobileService: ResponsiveService,
              public message: MessageService,
              public calendarService: CalenderServices,
              public errorService: ErrorsService) {
                this.isMobile = mobileService.isMobile();
  }

  ngOnInit(): void {
    this.rnd = Math.floor(Math.random() * 15);
    this.getCities();
  }

  getCities(): void {
    this.cityReq = {
      type: null,
      perPage: 20,
      search: null,
      hasTour: true,
      hasHotel: false,
    }
    this.cityApiService.getCities(this.cityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data
      } else {
        this.message.custom(res.message);
      }
      this.Loading = false;
    }, (error: any) => {
      this.Loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  cityChanged(): void {
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
  citySelected(city: CityResponseDTO): void {
    this.cityFC.setValue(city)
  }

}
