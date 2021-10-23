import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {PublicService} from "../../../Core/Services/public.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {SessionService} from "../../../Core/Services/session.service";
import {Observable} from "rxjs";
import {MessageService} from "../../../Core/Services/message.service";
import { TourTransferDTO} from "../../../Core/Models/tourDTO";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
//   //public Variable
//   isMobile;
//   isLoading = false;
//   minDate = new Date(); //datepicker
//
//   citiesList: CitiesModel[] = tourCity;
//   airlines: AirlineFilterObj[] = Airlines;
//   filteredOrigin: Observable<CitiesModel[]>;
//   filteredDest: Observable<CitiesModel[]>;
//   filteredhotel: Observable<any[]>[] = [];
//   tourReqDTO: TourDTO.PackageDTO;
//   addResponse;
//   typeTour;
//   user: AccountDTO.UserDTO;
//   dayCount = 2;
//   id = 0;
//   tourDetail = [];
//   operation = 1;
//   minPrice = 0;
//
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     public message: MessageService,
//     public session: SessionService,
//     public calenderServices: CalenderServices,
//     public publicServices: PublicService,
//     public fb: FormBuilder,
//     public mobileService: ResponsiveService) {
//     this.isMobile = mobileService.isMobile();
//   }
//
//
// ////formGroup
//   form = this.fb.group({
//     id: 0,
//     title: new FormControl('', Validators.required),
//     originId: new FormControl('', Validators.required),
//     cityId: new FormControl('', Validators.required),
//     dateStart: new FormControl('', Validators.required),
//     dateEnd: new FormControl('', Validators.required),
//     duration: new FormControl('1', Validators.required),
//     creatorId: 9,
//     statusId: 80,
//     discount: new FormControl(0, Validators.required),
//     transfer: new FormControl(0, Validators.required),
//     commision: new FormControl(0, Validators.required),
//     insurance: new FormControl(0, Validators.required),
//     insuranceCurrency: new FormControl('90', Validators.required),
//     transferCurrency: new FormControl('90', Validators.required),
//     visaCurrency: new FormControl('90', Validators.required),
//     visaPrice: new FormControl(0, Validators.required),
//     detailed: new FormControl(false, Validators.required),
//     flightPriceAdult: new FormControl(0, Validators.required),
//     flightPriceChild: new FormControl(0, Validators.required),
//     flightPriceInfant: new FormControl(0, Validators.required),
//     imageUrl: '',
//     tours: this.fb.array([]),
//     airlineDepartureID: new FormControl('', Validators.required),
//     airlineReturnID: new FormControl('', Validators.required),
//     description: new FormControl('', Validators.required),
//     services: new FormControl('', Validators.required),
//     documents: new FormControl('', Validators.required),
//     expiry: new FormControl('', Validators.required),
//     tripType: new FormControl('71', Validators.required),
//     flightDepartureDate: new FormControl(''),
//     flightReturnDate: new FormControl(''),
//     rates: this.fb.group({
//       euro: new FormControl(0, Validators.required),
//       dollar: new FormControl(0, Validators.required),
//       lyra: new FormControl(0, Validators.required),
//     }),
//     offered: new FormControl(false),
//     promotion: new FormControl(false),
//     minPrice: 0
//   });
//
  ngOnInit() {

  }
//
//   submit() {
//
//   }
//
//   addRow() {
//     const Tours = this.fb.group({
//       twin:    [0],
//       single:  [0],
//       cwb:     [0],
//       cnb:     [0],
//       ADLRate: [0],
//       age:     [''],
//       id: [0],
//     });
//     this.ToursForm.push(Tours);
//   }
//
//
//   get ToursForm() {
//     return this.form.get('tours') as FormArray;
//   }
//
//
//   removePakage(i:any) {
//     this.ToursForm.removeAt(i);
//   }
//
//
//
//
//   fillObj() {
//     this.tourReqDTO = {
//       title: this.form.value.title,
//       stCity_id: this.form.value.originId,
//       endCity_id: this.form.value.cityId,
//       nightNum: this.form.value.duration,
//       dayNum: 0,
//       TransferType: 0,
//       transfer: TourTransferDTO[],
//       enDate: this.form.value.dateStart,
//       expireDate: this.calenderServices.convertDate(this.form.value.expiry, 'en'),
//       CHDFlightRate: 0,
//       defineTour: 0,
//       euroRate: this.form.get('rates').get('euro').value,
//       dollarRate: this.form.get('rates').get('dollar').value,
//       AEDRate: 0,
//       visaRate: 0,
//       visaPriceType: 0,
//       insuranceRate: 0,
//       transferPriceType: 0,
//       transferRate: 0,
//       insurancePriceType: 0,
//       services: this.form.value.services,
//       documents: this.form.value.documents,
//       description: this.form.value.description,
//       status: '',
//       packages: this.tourDetail,
//     }
//   }
//
//
//
//   private markFormGroupTouched(formGroup:any) {
//     (<any> Object).values(formGroup.controls).forEach((control:any) => {
//       control.markAsTouched();
//
//       if (control.controls) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
//
//   getDate(date:any) {}
}

