import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { TransferAPIService } from 'src/app/Core/Https/transfer-api.service';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { GetServiceRequestDTO } from 'src/app/Core/Models/commonDTO';


import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-detail-package',
  templateUrl: './detail-package.component.html',
  styleUrls: ['./detail-package.component.scss']
})
export class DetailPackageComponent implements OnInit {

  //public Variable
  isMobile;
  isLoading = false;


  services: GetServiceRequestDTO[] = []

  ratePricesFC = new FormControl('1');



  constructor(
    public setService:SetTourService,

    public cityApi: CityApiService,
    public transferApi: TransferAPIService,
    public transferRateApi: TransferRateAPIService,
    public message: MessageService,
    public tourApi: TourApiService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public route: ActivatedRoute,
    public router: Router,
    public commonApi: CommonApiService,
    public session: SessionService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }



  ngOnInit() {
    this.getService();
    // this.getHotels();
  }

  isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }






  getService(): void {
    this.commonApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.services = res.data;
      }
    }, (error: any) => {
    })
  }





  clean(obj: any): void {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }




  openRoomPopup(index: number) {
    // @ts-ignore
    // const data = this.ToursForm.controls[index].controls.roomType.value
    // const dialog = this.dialog.open(SetPricePopupComponent, {
    //   width: '50%',
    //   height: '70%',
    //   data: data
    // });
    // dialog.afterClosed().subscribe((result: RoomTypeSetDTO[]) => {
    //   if (result) {
    //     // @ts-ignore
    //     this.ToursForm.controls[index].controls.roomType.setValue(result);
    //   }
    // })
  }

  // changeRateForPackages(event: any) {
  //   this.ToursForm.controls.find(x => x.get('rate')?.setValue(event.target.value))
  //   if (+this.ratePricesFC.value === 1) {
  //     this.ToursForm.controls.find(x => x.get('ADLRate')?.setValue(0))
  //     this.ToursForm.controls.find(x => x.get('cnb')?.setValue(0))
  //     this.form.controls.CHDFlightRate.setValue(0)
  //     this.form.controls.ADLFlightRate.setValue(0)
  //   }
  // }

  checkPackageRate() {
    if(this.setService.obj.endCity_id !== ''){
      // @ts-ignore
      return +this.ratePricesFC.value > 1
    } else {
      return false;
    }
  }

  

}
