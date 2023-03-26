import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CityApiService } from "../../Core/Https/city-api.service";
import { CityListRequestDTO, CityResponseDTO } from "../../Core/Models/cityDTO";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorsService } from "../../Core/Services/errors.service";
import { CheckErrorService } from "../../Core/Services/check-error.service";
import { MessageService } from "../../Core/Services/message.service";
import { CalenderServices } from "../../Core/Services/calender-service";
import { Router } from "@angular/router";
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { DatesResDTO } from 'src/app/Core/Models/tourDTO';
import * as moment from 'moment';
import { SearchObjectDTO } from 'src/app/tour/list/list.component';

@Component({
  selector: 'prs-search-collapse',
  templateUrl: './search-collapse.component.html',
  styleUrls: ['./search-collapse.component.scss']
})
export class SearchCollapseComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Input() inCommingSearchObject?: SearchObjectDTO;
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  cities: CityResponseDTO[] = [];
  cityReq!: CityListRequestDTO;

  originFC = new FormControl(null, Validators.required);
  destFC = new FormControl(null, Validators.required);
  nightFC = new FormControl(0, Validators.required);
  stDateFC = new FormControl(null, Validators.required);
  reservedDates: DatesResDTO[] = [];
  nights: number[] = []
  originID: number | null = null;



  constructor(public cityApiService: CityApiService,
    public router: Router,
    public checkErrorService: CheckErrorService,
    public mobileService: ResponsiveService,
    public api: TourApiService,
    public message: MessageService,
    public calendarService: CalenderServices,
    public errorService: ErrorsService) {
    this.isMobile = mobileService.isMobile();
    this.isTablet = mobileService.isTablet();
    this.isDesktop = mobileService.isDesktop();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inCommingSearchObject.firstChange) {
      this.originFC.setValue(changes.inCommingSearchObject.currentValue?.origin)
      this.destFC.setValue(changes.inCommingSearchObject.currentValue?.dest)
      this.getReservedDates();
    }
  }

  ngOnInit(): void {
  }

  search() {
    this.onSubmit.emit({
      origin: this.originFC.value,
      dest: this.destFC.value,
      stDate: this.stDateFC.value,
      night: this.nightFC.value
    })
  }

  myFilter = (d: Date | null): boolean => {

    let list = this.reservedDates.filter(x => moment(x.date, 'YYYY-MM-DD').isSame(moment(d, 'YYYY-MM-DD')))
    if (list.length > 0) {
      this.nights = list[0].nights;
      this.nightFC.setValue(this.nights[0])
    }
    return list.length > 0;
  };



  originSelected(city: CityResponseDTO): void {
    this.originFC.setValue(city.slugEn)
    this.originID = city.id;
    if (this.destFC.valid) {
      this.getReservedDates();
    }
  }
  destSelected(city: CityResponseDTO): void {

    this.destFC.setValue(city.slugEn)
    this.reservedDates = [];
    this.stDateFC.setValue(null)
    this.nightFC.setValue(null)
    this.inCommingSearchObject = undefined
    this.getReservedDates();
  }

  getReservedDates(): void {
    this.api.getDates(this.originFC.value, this.destFC.value).subscribe((res: any) => {
      if (res.isDone) {
        this.reservedDates = res.data;
        if (this.inCommingSearchObject) {
          this.stDateFC.setValue(this.inCommingSearchObject.stDate)
        }
        this.reservedDates.forEach(x => {
          if (moment(x.date, 'YYYY-MM-DD').isSame(moment(this.stDateFC.value, 'YYYY-MM-DD'))) {
            this.nights = x.nights;
          }
        });
        this.nightFC.setValue(this.inCommingSearchObject?.night)
      }
    }, (error: any) => {
      this.checkErrorService.check(error)
    })
  }
}
