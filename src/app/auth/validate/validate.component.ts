import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {PublicService} from "../../Core/Services/public.service";
import {SessionService} from "../../Core/Services/session.service";
import {MessageService} from "../../Core/Services/message.service";


declare var $: any;

@Component({
  selector: 'prs-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  @Input() isForgetPassword = false;
  @Output() forgetPassword = new EventEmitter();
  @Input() phone = '';
  phoneNumberFC = new FormControl('', Validators.required);
  isLoading = false;

  constructor(public router: Router,
              public api: AuthApiService,
              public errorService: ErrorsService,
              public publicService: PublicService,
              public message: MessageService,
              public session: SessionService
  ) {
    errorService.clear();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.phone !== '') {
      this.phoneNumberFC.setValue(this.phone);
      $('#someTextBox').focus();
    }
  }

  validate(): void {
    this.isLoading = true;
    this.api.validate(this.publicService.fixNumbers(this.phoneNumberFC.value)).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.checkAuthMode(res.data.authMode);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.errorService.check(error);
      this.errorService.recordError(error.error.data);
      this.isLoading = false;
    });
  }

  sendSms(phoneNumber: string, tokenType: string): void {
    this.api.sendSms(phoneNumber, tokenType).subscribe((res: any) => {
      if (res.isDone) {
        if (this.isForgetPassword) {
          this.forgetPassword.emit(true);
        } else {
          this.router.navigateByUrl('/auth/register/' + phoneNumber);
        }
      } else {
        alert(res.message);
      }
    }, (error: any) => {
      this.errorService.check(error)
      // alert('مشکلی در سرور رخ داده است');
    });
  }

  checkAuthMode(authMode: number): void {
    if (authMode === 1) {
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
