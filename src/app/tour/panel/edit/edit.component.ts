import { Component, OnInit } from '@angular/core';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SetTourService } from '../set-tour.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import * as moment from 'jalali-moment';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { HotelRequestDTO } from 'src/app/Core/Models/hotelDTO';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
declare var $: any;

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  //public Variable
  slug: string | null = ''
  isLoading: boolean = false;
  public show = true
  infoLoading = false;
  minDate = new Date(); //datepicker
  typeTour: any;
  dayCount = 2;
  id = 0;
  cityID = 0
  cities: CityResponseDTO[] = []
  tourType = false;
  isSlugGenerated = false;
  calledApies: string[] = []
  info: any = null;
  constructor(public route: ActivatedRoute,
    public cityApi: CityApiService,
    public commonApi: CommonApiService,
    public calenderServices: CalenderServices,
    public hotelApi: HotelApiService,
    public checkError: CheckErrorService,
    public router: Router,
    public errorService: ErrorsService,
    public publicServices: PublicService,
    public transferTypeApi: TransferRateAPIService,
    public mobileService: ResponsiveService,
    public setService: SetTourService,
    public message: MessageService,
    public session: SessionService,
    public tourApi: TourApiService) {
    setService.removeRequestObject()
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()

  }
  getInfo(): void {
    this.infoLoading = true;
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.getCities()
          this.getTransferRates()
          this.getHotels()
        }
      }, (error: any) => {
        this.infoLoading = false
        this.message.error()
      })
    }
  }



  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.getTransferRates();
    this.setService.obj.packages = [];
    this.getHotels();


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
        this.setInfo();
        this.reload()
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.getTransferRates();
  }

  changes() {
    this.setService.obj.dayNum = this.setService.obj.nightNum + 1;
  }


  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.info.endCity.id,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.setService.hotels = res.data;
        // if (this.setService.hotels.length > 0) {
        //   this.setService.addRow(this.setService.hotels[0].id);
        // }
      }
    }, (error: any) => {
      this.message.error();
    })
  }


  dateChanged() {
    this.setService.transferRates = []
    this.getTransferRates();
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

  getTransferRates(): void {
    const req = {
      departure_date: this.info.stDate ? moment(this.info.stDate).format('YYYY-MM-DD') : null,
      dest: this.info.endCity.id,
      origin: this.info.stCity.id,
      paginate: true,
      return_date: this.info.enDate ? moment(this.info.enDate).format('YYYY-MM-DD') : null
    }
    this.transferTypeApi.getTransfers(req).subscribe((res: any) => {
      if (res.isDone) {
        this.setService.transferRates = res.data;

        this.setService.transferRates.forEach(x => {
          x.isChecked = this.info.newTransfers.some((y:any) => y.id === x.id);
        // if(this.info.transferIds.includes(x.id)){
        //   x.isChecked = true;
        // }
        })
        console.log(this.setService.transferRates);


        this.getHotels();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }


  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }



  setInfo() {
    // console.log(this.info)

    this.setService.obj = {
      title: this.info.title,
      slug: this.info.slug,
      stCity_id: this.info.stCity.id,
      endCity_id: this.info.endCity.id,
      nightNum: this.info.nightNum.toString(),
      dayNum: this.info.dayNum.toString(),
      offered: this.info.offered,
      TransferType: this.info.transferType,
      enDate: this.info.enDate,
      stDate: this.info.stDate,
      expireDate: this.info.expireDate,
      defineTour: this.info.defineTour,
      euroRate: this.info.euroRate.toString(),
      dollarRate: this.info.dollarRate.toString(),
      AEDRate: this.info.AEDRate.toString(),
      visaRate: this.info.visaRate.toString(),
      visaPriceType: this.info.visaPriceType,
      insuranceRate: this.info.insuranceRate.toString(),
      transferPriceType: this.info.transferPriceType,
      transferRate: this.info.transferRate.toString(),
      insurancePriceType: this.info.insurancePriceType,
      services: this.info.services,
      documents: this.info.documents,
      description: this.info.description,
      status: this.info.status,
      type: this.info.type,
      transferType: +this.info.transferType,
      packages: this.info.packages,
      CHDFlightRate: '',
      ADLFlightRate: '',
      transferIds: this.getTransferIds(),
      transfers: [],
    }

  }



  getTransferIds(): number[] {
    let result: any[] = [];
    this.info.newTransfers.forEach((item: any) => {
      result.push(item.id)
    })
    return result;
  }


  submit() {
    this.isLoading = true
    this.setService.obj.stDate = this.calenderServices.convertDateSpecial(this.setService.obj.stDate,'en')
    this.setService.obj.enDate = this.calenderServices.convertDateSpecial(this.setService.obj.enDate,'en')
    this.setService.obj.expireDate = this.calenderServices.convertDateSpecial(this.setService.obj.expireDate,'en')

    this.tourApi.editTour(this.setService.obj,this.slug).subscribe((res: any) => {
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
