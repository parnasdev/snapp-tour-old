import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'prs-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent extends EditComponent implements OnInit {



  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getService()
  }
  
  submit() {
    this.isLoading = true
    this.setService.obj.title =  this.setService.obj.title + '-کپی'
    this.setService.obj.slug =this.setService.obj.title.split(' ').join('-')
    this.setService.obj.stDate = this.calenderServices.convertDateSpecial(this.setService.obj.stDate, 'en')
    this.setService.obj.enDate = this.calenderServices.convertDateSpecial(this.setService.obj.enDate, 'en')
    this.setService.obj.expireDate = this.calenderServices.convertDateSpecial(this.setService.obj.expireDate, 'en')

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
