import {Component, OnInit} from '@angular/core';
import {CityTourInfoDTO, TourInfoDTO, TourPackageDTO} from "../../../Core/Models/tourDTO";
import {AddComponent} from "../add/add.component";
import {HotelRequestDTO} from "../../../Core/Models/hotelDTO";
import {CityListRequestDTO} from "../../../Core/Models/cityDTO";
import {moveItemInArray} from "@angular/cdk/drag-drop";

declare var $: any;

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends AddComponent implements OnInit {
  //public Variable
  slug: string | null = ''
  public show = true
  infoLoading = false;
  addResponse: any;
  info: TourInfoDTO = {
    AEDRate: 0,
    CHDFlightRate: '',
    ADLFlightRate: '',
    TransferType: '',
    dayNum: 0,
    defineTour: false,
    description: '',
    documents: '',
    dollarRate: 0,
    enDate: '',
    endCity: {} as CityTourInfoDTO,
    euroRate: 0,
    expireDate: '',
    insurancePriceType: 0,
    insuranceRate: 0,
    nightNum: 0,
    offered: null,
    minPrice: '0',
    packages: [],
    services: '',
    slug: '',
    stCity: {
      id: 0,
      name: '',
      slug: '',
      description: '',
      images: [],
      slugEn: '',
      type: false
    },
    stDate: '',
    status: '',
    title: '',
    transfers: [],
    transferPriceType: 0,
    transferRate: 0,
    type: false,
    user: {
      name: '',
      family: '',
    },
    visaPriceType: 0,
    visaRate: 0,
    tours: [],
  };
  originTime = '00:00'
  destTime = '00:00'
  destCityId = 0;

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()
  }


  addOldRow(packageItem: TourPackageDTO = {} as TourPackageDTO) {
    if (!this.isEmpty(packageItem)) {
      const Tours = this.fb.group({
        parent: packageItem.parent,
        order_item: packageItem.order_item,
        id: packageItem.id,
        offered: [packageItem.offered],
        user_id: packageItem.user_id,
        hotel_id: [packageItem.hotel.id],
        services: [packageItem.services ? packageItem.services.id : ''],
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
        twinCapacity: [packageItem.prices.twinCapacity],
        singleCapacity: [packageItem.prices.singleCapacity],
        cwbCapacity: [packageItem.prices.cwbCapacity],
        quadCapacity: [packageItem.prices.quadCapacity],
        tripleCapacity: [packageItem.prices.tripleCapacity],
        twinRate: [packageItem.prices.twinRate],
        singleRate: [packageItem.prices.singleRate],
        cwbRate: [packageItem.prices.cwbRate],
        cnbRate: [packageItem.prices.cnbRate],
        quadRate: [packageItem.prices.quadRate],
        tripleRate: [packageItem.prices.tripleRate],
        ADLRate: [packageItem.prices.ADLRate],
        age: [packageItem.prices.age],
        pool: [packageItem.prices.pool],
        status: [packageItem.status],
        roomType: [packageItem.prices.roomType]
      })
      this.ToursForm.push(Tours);
    } else {
      const Tours = this.fb.group({
        parent: null,
        user_id: null,
        order_item: null,
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
        pool: [null],
        status: [null],
        roomType: [[]]
      });
      this.ToursForm.push(Tours);
    }
  }

  getInfo(): void {
    this.infoLoading = true;
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.getCities();
          this.getTransfer();
          this.getService();

        }

      }, (error: any) => {
        this.infoLoading = false
        this.message.error()
      })
    }
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasOriginTour: false,
      hasDestTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.info.endCity.id;
        this.form.controls.stCity_id.setValue(this.info.stCity.id);
        this.form.controls.endCity_id.setValue(this.info.endCity.id);
        this.reload();
        // @ts-ignore
        this.tourType = this.cities.find(x => x.id === +this.form.value.endCity_id)?.type;
        this.setHotelsData();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  setHotelsData(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.cityID,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
        this.setValue();
        this.setFormArray(this.info.packages);
        this.disableFields();
        if(this.form.controls.defineTour.value === 'false'){
          this.setPackageRate();
        }
      }
    }, (error: any) => {
      this.message.error();
    })
  }

  removeEditPackage(i: any) {
    if (this.ToursForm.value[i].id) {
      this.hotelApi.deletePackage(this.ToursForm.value[i].id).subscribe((res: any) => {
        if (res.isDone) {
          this.ToursForm.removeAt(i);
        }
      }, (error: any) => {
        this.checkError.check(error);
      })
    } else {
      this.ToursForm.removeAt(i);
    }
  }

  setValue(): void {
    this.form.controls.title.setValue(this.info.title)
    this.form.controls.slug.setValue(this.info.slug)
    this.form.controls.nightNum.setValue(this.info.nightNum)
    this.form.controls.dayNum.setValue(this.info.dayNum)
    this.form.controls.offered.setValue(this.info.offered)
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
    if (this.info.transfers.length > 0) {
      this.originDateFC.setValue(this.info.transfers[0].dateTime.split(' ')[0]);
      this.originTimeFC.setValue(this.info.transfers[0].dateTime.split(' ')[1]);
      this.originTransferFC.setValue(+this.info.transfers[0].transfer_id);
      this.originTime = this.info.transfers[0].dateTime.split(' ')[1];
    }
    if (this.info.transfers.length > 1) {
      this.destDateFC.setValue(this.info.transfers[1].dateTime.split(' ')[0]);
      this.destTimeFC.setValue(this.info.transfers[1].dateTime.split(' ')[1]);
      this.destTransferFC.setValue(+this.info.transfers[1].transfer_id);
      this.destTime = this.info.transfers[1].dateTime.split(' ')[1];
    }
    this.isSlugGenerated = true;
    this.infoLoading = false;
  }

  setFormArray(packages: TourPackageDTO[]): void {
    this.ToursForm.clear();
    packages.forEach(x => {
      this.addOldRow(x);
    })
    this.updatePackagePrices();

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

  getIncomingHotel(index: number) {
    this.getStars(index)
    // @ts-ignore
    return this.hotels.find(x => x.id === this.ToursForm.controls[index].controls.hotel_id.value)
  }

  setPackageRate(){
    // @ts-ignore
    this.ratePricesFC.setValue(this.info.packages[0].rate.id.toString());
    this.ToursForm.controls.find(x => x.get('rate')?.setValue(this.info.packages[0].rate.id.toString()))
    if (+this.ratePricesFC.value === 1) {
      this.ToursForm.controls.find(x => x.get('ADLRate')?.setValue(0))
    }
    this.form.controls.CHDFlightRate.setValue(this.info.CHDFlightRate)
    this.form.controls.ADLFlightRate.setValue(this.info.ADLFlightRate ? this.info.ADLFlightRate : 0)
  }

}
