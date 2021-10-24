import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {PublicService} from "../../../Core/Services/public.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {SessionService} from "../../../Core/Services/session.service";
import {Observable} from "rxjs";
import {MessageService} from "../../../Core/Services/message.service";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isMobile;
  isLoading = false;
  minDate = new Date(); //datepicker

  filteredhotel: Observable<any[]>[] = [];
  tourReqDTO: any;
  addResponse: any;
  typeTour: any;
  user: any;
  dayCount = 2;
  id = 0;
  tourDetail = [];
  operation = 1;
  minPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public message: MessageService,
    public session: SessionService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }


////formGroup
  form = this.fb.group({
    title: new FormControl('تور کیش 3 روزه'),
    stCity_id: new FormControl('1'),
    endCity_id: new FormControl('3'),
    nightNum: new FormControl('3'),
    dayNum: new FormControl('4'),
    TransferType: new FormControl(),
    transfer: {
      transfer_id: 0,
      dateTime: new FormControl(),
      type: 0,
    },
    enDate: new FormControl('1400/09/13'),
    expireDate: new FormControl('1400/09/09'),
    CHDFlightRate: new FormControl('12000'),
    defineTour: new FormControl(false),
    euroRate: new FormControl('14000'),
    dollarRate: new FormControl('26700'),
    AEDRate: new FormControl(),
    visaRate: new FormControl('14000'),
    visaPriceType: new FormControl(),
    insuranceRate: new FormControl('17800'),
    transferPriceType: new FormControl(),
    transferRate: new FormControl('14000'),
    insurancePriceType: new FormControl(),
    services: new FormControl('تست خدمات'),
    documents: new FormControl('تست مدارک'),
    description: new FormControl('تست توضیحات'),
    status: new FormControl('2'),
    packages: [],
  });

  ngOnInit() {

  }

  submit() {

  }

  addRow() {
    const Tours = this.fb.group({
      twin: [0],
      single: [0],
      cwb: [0],
      cnb: [0],
      ADLRate: [0],
      age: [''],
      id: [0],
    });
    this.ToursForm.push(Tours);
  }


  get ToursForm() {
    return this.form.get('tours') as FormArray;
  }


  removePakage(i: any) {
    this.ToursForm.removeAt(i);
  }


  fillObj() {
    this.tourReqDTO = {
      title: this.form.value.title,
      stCity_id: +this.form.value.stCity_id,
      endCity_id: +this.form.value.endCity_id,
      nightNum: this.form.value.nightNum,
      dayNum: this.form.value.dayNum,
      TransferType: 0,
      transfer: [{
        transfer_id: 0,
        dateTime: this.form.value.transfer.dateTime,
        type: 'origin',
      },{
        transfer_id: 0,
        dateTime: this.form.value.transfer.dateTime,
        type: 'destination',
      },],
      enDate: this.form.value.dateStart,
      expireDate: this.form.value.expireDate,
      CHDFlightRate: this.form.value.CHDFlightRate,
      defineTour: 0,
      euroRate: this.form.value.euroRate,
      dollarRate: this.form.value.dollarRate,
      AEDRate: this.form.value.AEDRate,
      visaRate: this.form.value.visaRate,
      insuranceRate: this.form.value.insuranceRate,
      transferRate: this.form.value.transferRate,
      transferPriceType: 0,
      visaPriceType: 0, // dollar euro derham
      insurancePriceType: 0,
      services: this.form.value.services,
      documents: this.form.value.documents,
      description: this.form.value.description,
      status: this.form.value.status,
      packages: this.tourDetail,
    }
  }


  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getData() {
    this.fillObj()
  }
}

