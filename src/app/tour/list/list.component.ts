import { Component, OnInit } from '@angular/core';
import { TourApiService } from "../../Core/Https/tour-api.service";
import { TourListRequestDTO, TourListResDTO } from "../../Core/Models/tourDTO";
import { MessageService } from "../../Core/Services/message.service";
import { CheckErrorService } from "../../Core/Services/check-error.service";
import { ErrorsService } from "../../Core/Services/errors.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CityApiService } from "../../Core/Https/city-api.service";
import { Title } from "@angular/platform-browser";
import { SettingService } from "../../Core/Services/setting.service";
import { CalenderServices } from 'src/app/Core/Services/calender-service';

export interface SearchObjectDTO {
  origin: string;
  dest: string;
  stDate: string;
  night: number | string;
}

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tourReq: TourListRequestDTO = {
    origin: '',
    dest: '',
    isAdmin: false,
    stDate: '',
    night: 0,
    paginate: true,
    search: null,
    month: null,
    sortByDate: false,
    perPage: 20,
    type: null,
    status: '',
  };

  tours: TourListResDTO[] = [];
  loading = false;

  p = 1

  sortByDate = false;

  searchObject: SearchObjectDTO = {
    origin: '',
    dest: '',
    stDate: '',
    night: 0
  }



  constructor(public tourApiService: TourApiService,
    public route: ActivatedRoute,
    public checkErrorService: CheckErrorService,
    public errorService: ErrorsService,
    public cityApi: CityApiService,
    public calendarService: CalenderServices,
    public setting: SettingService,
    public title: Title,
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
    this.setting.Setting$.subscribe(x => {
      if (x === 'true') {
        this.title.setTitle('لیست تورها' + '|' + this.setting.settings.title)
      }
    })
    // @ts-ignore
    this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
    this.route.queryParams.subscribe(params => {
      this.setData(params)
      this.getTours()
    })



  }

  setData(params: any): void {
    this.searchObject.origin = params['origin']
    this.searchObject.dest = params['dest'];
    this.searchObject.night = params['night'];
    this.searchObject.stDate = params['stDate'];
  }




  getTours(): void {
    console.log(this.searchObject.stDate);
    this.loading = true;
    this.tourReq = {
      origin: this.searchObject.origin,
      dest: this.searchObject.dest,
      isAdmin: false,
      stDate:this.searchObject.stDate ?  this.calendarService.convertDate(this.searchObject.stDate, 'en', 'yyyy-MM-DD') : null,
      night: this.searchObject.night === '0' ? null :this.searchObject.night,
      paginate: true,
      search: null,
      month: null,
      sortByDate: this.sortByDate,
      perPage: 20,
      type: null,
      status: null,
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


  search(event: SearchObjectDTO) {
    this.searchObject = event;
    this.router.navigate([`/tours/`], {
      queryParams: event
    })
    this.getTours();


  }

}
