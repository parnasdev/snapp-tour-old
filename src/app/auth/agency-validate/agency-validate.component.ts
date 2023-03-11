import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { ConvertRequestDTO, ValidateResDTO } from 'src/app/Core/Models/AuthDTO';

import { ValidateComponent } from '../validate/validate.component';
declare var $: any;
@Component({
  selector: 'prs-agency-validate',
  templateUrl: './agency-validate.component.html',
  styleUrls: ['./agency-validate.component.scss']
})
export class AgencyValidateComponent extends ValidateComponent implements OnInit {

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

  checkSubmit(flag: boolean) {
    if (flag) {
      this.router.navigateByUrl('/auth/partner/login/' + this.phoneNumberFC.value);
    } else {
      this.showBox = false;
    }
  }

  checkAuthMode(validateData: ValidateResDTO): void {
    if (validateData.authMode === 1) {
      if(validateData.accountType == 'user') {
        this.showBox = true;
      } else {
        
      }
      // login
      if (this.isForgetPassword) {
        this.sendSms(this.phoneNumberFC.value, 'forget');
      } else {
        this.router.navigateByUrl('/auth/login/' + this.phoneNumberFC.value);
      }
    } else {
      // register
      this.sendSms(this.phoneNumberFC.value, 'activation');
    }
  }
}
