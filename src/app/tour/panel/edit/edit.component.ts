import {Component, OnInit} from '@angular/core';
import {TourInfoDTO, TourPackageDTO} from "../../../Core/Models/tourDTO";
import {AddComponent} from "../add/add.component";
import {HotelRequestDTO} from "../../../Core/Models/hotelDTO";
import {CityListRequestDTO} from "../../../Core/Models/cityDTO";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends AddComponent implements OnInit {
  //public Variable
  slug: string | null = ''

  addResponse: any;
  info!: TourInfoDTO
  originTime = '00:00'
  destTime = '00:00'

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()
  }

  addOldRow(packageItem: TourPackageDTO = {} as TourPackageDTO) {
    if (!this.isEmpty(packageItem)) {
      const Tours = this.fb.group({
        parent: packageItem.parent,
        id: packageItem.id,
        offered: false,
        user_id: packageItem.user_id,
        hotel: [packageItem.hotel],
        services: [packageItem.services.id],
        rate: [packageItem.rate.id],
        discountsTwin: [packageItem.discounts.twin],
        discountsSingle: [packageItem.discounts.single],
        discountsCwb: [packageItem.discounts.cwb],
        discountsCnb: [packageItem.discounts.cnb],
        twin: [packageItem.prices.twin],
        single: [packageItem.prices.single],
        cwb: [packageItem.prices.cwb],
        cnb: [packageItem.prices.cnb],
        quad: [packageItem.prices.quad],
        triple: [packageItem.prices.triple],
        twinRate: [packageItem.prices.twinRate],
        singleRate: [packageItem.prices.singleRate],
        cwbRate: [packageItem.prices.cwbRate],
        cnbRate: [packageItem.prices.cnbRate],
        quadRate: [packageItem.prices.quadRate],
        tripleRate: [packageItem.prices.tripleRate],
        ADLRate: [packageItem.prices.ADLRate],
        age: [packageItem.prices.age],
        status: [packageItem.status]
      })
      this.ToursForm.push(Tours);
    } else {
      const Tours = this.fb.group({
        parent: null,
        user_id: null,
        hotel_id: [0],
        services: [null],
        rate: [1],
        id: [null],
        discountsTwin: [null],
        discountsSingle: [null],
        discountsCwb: [null],
        discountsCnb: [null],
        twin: [null],
        single: [null],
        cwb: [null],
        cnb: [null],
        quad: [null],
        triple: [null],
        ADLRate: [null],
        age: [null],
        status: [null]
      });
      this.ToursForm.push(Tours);
    }

  }

  getInfo(): void {
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.getEditCities();
          this.getTransfer();
          this.getHotels();
          this.getService();
          this.setValue();
          this.setFormArray(this.info.packages);
          this.disableFields();
        }
      }, (error: any) => {
        this.message.error()
      })
    }
  }

  getEditCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.info.endCity.id;
        debugger
        this.form.controls.stCity_id.patchValue(this.info.stCity.id);
        this.form.controls.endCity.patchValue(this.info.endCity);
        this.getHotels();
        // {
        //   name: this.info.endCity.name,
        //     id: this.info.endCity.id,
        //   type: this.info.endCity.type
        // }
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.cityID,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
      }
    }, (error: any) => {
      this.message.error();
    })
  }

  setValue(): void {
    this.form.controls.title.setValue(this.info.title)
    this.form.controls.nightNum.setValue(this.info.nightNum)
    this.form.controls.dayNum.setValue(this.info.dayNum)
    this.form.controls.TransferType.setValue(this.info.TransferType)
    this.form.controls.enDate.setValue(this.info.enDate)
    this.form.controls.stDate.setValue(this.info.stDate)
    this.form.controls.expireDate.setValue(this.info.expireDate)
    this.form.controls.CHDFlightRate.setValue(this.info.CHDFlightRate)
    this.form.controls.ADLFlightRate.setValue(this.info.ADLFlightRate ? this.info.ADLFlightRate : 0)
    this.form.controls.defineTour.setValue(this.info.defineTour.toString())
    this.form.controls.euroRate.setValue(this.info.euroRate)
    this.form.controls.dollarRate.setValue(this.info.dollarRate)
    this.form.controls.AEDRate.setValue(this.info.AEDRate)
    this.form.controls.visaRate.setValue(this.info.visaRate)
    this.form.controls.visaPriceType.setValue(this.info.visaPriceType)
    this.form.controls.insuranceRate.setValue(this.info.insuranceRate)
    this.form.controls.transferPriceType.setValue(this.info.transferPriceType)
    this.form.controls.transferRate.setValue(this.info.transferRate)
    this.form.controls.insurancePriceType.setValue(this.info.insurancePriceType)
    this.form.controls.services.setValue(this.info.services)
    this.form.controls.documents.setValue(this.info.documents)
    this.form.controls.description.setValue(this.info.description)
    this.form.controls.status.setValue(this.info.status)
    this.originDateFC.setValue(this.info.transfers[0].dateTime.split(' ')[0]);
    this.originTimeFC.setValue(this.info.transfers[0].dateTime.split(' ')[1]);
    this.destDateFC.setValue(this.info.transfers[1].dateTime.split(' ')[0]);
    this.destTimeFC.setValue(this.info.transfers[1].dateTime.split(' ')[1]);
    this.originTransferFC.setValue(+this.info.transfers[0].transfer_id);
    this.destTransferFC.setValue(+this.info.transfers[1].transfer_id);
    this.originTime = this.info.transfers[0].dateTime.split(' ')[1]
    this.destTime = this.info.transfers[1].dateTime.split(' ')[1]
  }

  setFormArray(packages: TourPackageDTO[]): void {
    this.ToursForm.clear();
    packages.forEach(x => {
      this.addOldRow(x);
    })
  }

  submit() {
    this.convertTour();
    this.fillObj();
    this.editTour();
  }

  editTour(): void {
    this.isLoading = true
    this.tourApi.editTour(this.tourReqDTO, this.slug).subscribe((res: any) => {
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
        this.markFormGroupTouched(this.form);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

}
