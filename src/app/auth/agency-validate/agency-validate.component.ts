import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from '@angular/core';

import { ValidateComponent } from '../validate/validate.component';
declare var $: any;
@Component({
  selector: 'prs-agency-validate',
  templateUrl: './agency-validate.component.html',
  styleUrls: ['./agency-validate.component.scss']
})
export class AgencyValidateComponent extends ValidateComponent  implements OnInit {

  sendSms(phoneNumber: string, tokenType: string): void {
    this.api.sendSms(phoneNumber, tokenType).subscribe((res: any) => {
      if (res.isDone) {
        if (this.isForgetPassword) {
          this.forgetPassword.emit(true);
        } else {
          this.router.navigate(['/auth/register/' + phoneNumber],{ queryParams: {type: '4'}});
        }
      } else {
        alert(res.message);
      }
    }, (error: any) => {
      this.errorService.check(error)
      // alert('مشکلی در سرور رخ داده است');
    });
  }
}
