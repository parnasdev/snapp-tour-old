import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ReserveInfoDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-user-reservation-info',
  templateUrl: './user-reservation-info.component.html',
  styleUrls: ['./user-reservation-info.component.scss']
})
export class UserReservationInfoComponent implements OnInit {

  reserveID = '';
  data?: ReserveInfoDTO;

  stDate = '';
  enDate = '';

  nameFC = new FormControl(this.session.getName(), Validators.required);
  familyFC = new FormControl(this.session.getFamily(), Validators.required);
  cityFC = new FormControl(1, Validators.required);
  idCodeFC = new FormControl('', Validators.required);
  phoneFC = new FormControl(this.session.getPhone(), Validators.required);

  profileFG: FormGroup = this.fb.group({
    name: this.nameFC,
    family: this.familyFC,
    idCode: this.idCodeFC,
    city: this.cityFC,
    phone: this.phoneFC
  })

  constructor(public route: ActivatedRoute,
    public messageService: MessageService,
    public checkError: CheckErrorService,
    public fb: FormBuilder,
    public session: SessionService,
    public calService: CalenderServices,
    public api: TourApiService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.reserveID = this.route.snapshot.paramMap.get('reserveid');
    this.getReserve();
  }
  getReserve(): void {
    this.api.getReserve(+this.reserveID).subscribe((res: any) => {
      if (res.isDone) {
        this.data = res.data;
        this.setDateAndTime();
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }


  setDateAndTime(): void {
    this.stDate = this.calService.convertDate(this.data?.package?.tour?.transfers[0].dateTime.split(' ')[0], 'fa') + ' ' +
      this.data?.package?.tour?.transfers[0].dateTime.split(' ')[1];

    this.enDate = this.calService.convertDate(this.data?.package?.tour?.transfers[1].dateTime.split(' ')[0], 'fa') + ' ' +
      this.data?.package?.tour?.transfers[1].dateTime.split(' ')[1];
  }
}
