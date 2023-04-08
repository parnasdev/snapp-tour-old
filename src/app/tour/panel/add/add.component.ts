import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SetTourService } from '../set-tour.service';

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isLoading = false;


  constructor(
    public setService: SetTourService,
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
