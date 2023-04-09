import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetTourService } from '../set-tour.service';

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isLoading = false;
  typeTour: any;
  minDate = new Date();
  dayCount = 2;
  id = 0;
  cityID = 0
  cities: CityResponseDTO[] = []
  tourType = false;
  isSlugGenerated = false;


  constructor(
    public setService: SetTourService,
    public cityApi: CityApiService,
    public commonApi: CommonApiService,
    public session: SessionService,
    public checkError: CheckErrorService,
    public message: MessageService,
    public calenderService: CalenderServices,
    public router: Router,
    public errorService: ErrorsService,
    public tourApi: TourApiService) {
    setService.removeRequestObject()
  }

  ngOnInit() {

  }

    getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasOriginTour: false,
      search: null,
      hasDestTour: false,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.cities[1].id;
        this.setService.obj.stCity_id = this.cities[0].id.toString();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
    this.setService.obj.packages = [];
    this.setService.getHotels();
  }

  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
  }

  changes() {
   this.setService.obj.dayNum = this.setService.obj.nightNum + 1;
  }


  dateChanged() {
    this.setService.transferRates = []
    this.setService.getTransferRates();
  }

  generateSlug(): void {
    if (!this.isSlugGenerated) {
      this.tourApi.generateSlug(this.setService.obj.title).subscribe((res: any) => {
        if (res.data) {
          this.setService.obj.slug = res.data;
          this.isSlugGenerated = true
        } else {
          this.message.custom(res.message)
        }
      }, (error: any) => {
        this.message.error()
      })
    } else {
      this.setService.obj.slug = this.setService.obj.title.split(' ').join('-')
    }
  }

  submit() {
    this.call()
  }


  call(): void {
    this.isLoading = true
    this.setService.obj.stDate = this.calenderService.convertDateSpecial(this.setService.obj.stDate,'en')
    this.setService.obj.enDate = this.calenderService.convertDateSpecial(this.setService.obj.enDate,'en')
    this.setService.obj.expireDate = this.calenderService.convertDateSpecial(this.setService.obj.expireDate,'en')

    this.tourApi.createTour(this.setService.obj).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.errorService.clear();
        this.router.navigateByUrl('/panel/tour');
      }
    }, (error: any) => {
      this.isLoading = false;
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }
}
