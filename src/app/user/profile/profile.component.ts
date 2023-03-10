import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { HttpErrorResponse, HttpEventType, HttpResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { ProfileDTO } from 'src/app/Core/Models/AuthDTO';
import { UserApiService } from 'src/app/Core/Https/user-api.service';
import { AuthApiService } from 'src/app/Core/Https/auth-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';


@Component({
  selector: 'prs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nameFC = new FormControl('')
  familyFC = new FormControl('')
  usernameFC = new FormControl('')
  emailFC = new FormControl()
  genderFC = new FormControl('');
  cityFC = new FormControl();
  phoneFC = new FormControl()
  // LicenseFileA = '';
  infoLoading = false;
  forgetIsLoading = false;
  codeFC = new FormControl('', Validators.required);
  passwordFC = new FormControl('', Validators.required);
  retypePasswordFC = new FormControl('', Validators.required);
  isSendCode = false
  userForm = this.fb.group({
    name: this.nameFC,
    family: this.familyFC,
    city: this.cityFC,
    username: this.usernameFC,
    email: this.emailFC,
    gender: this.genderFC
  });
  isLoading = false
  req: ProfileDTO = {
    name: '',
    username: '',
    city: 0,
    gender: 0,
    birthDay: '',
    createdAt: '',
    email: '',
    role: '',
    family: '',
    phone: '',
    agency: {
      name: '',
      logo: '',
      LicenseFileA: '',
      LicenseFileB: '',
      email: '',
      address: '',
      tell: '',
      site: '',
      necessaryPhone: ''
    }
  }


  constructor(public fb: FormBuilder,
    public api: UserApiService,
    public authApi: AuthApiService,
    public dialog: MatDialog,
    public commonApi: CommonApiService,
    public publicService: PublicService,
    public session: SessionService,
    public message: MessageService,
    public errorsService: ErrorsService) {
    errorsService.clear();
  }

  ngOnInit(): void {
    this.getInfo();
  }


  setReq(): void {
    this.req = {
      name: this.nameFC.value,
      username: this.usernameFC.value,
      family: this.familyFC.value,
      city: this.cityFC.value,
      justEditProfile: true,
      gender: this.genderFC.value,
      email: this.emailFC.value,
      birthDay: '',
      createdAt: '',
      role: '',
      phone: this.phoneFC.value,
      agency: {
        name: '',
        logo: '',
        LicenseFileA: null,
        id: 0,
        LicenseFileB: null,
        email: '',
        address: '',
        tell: '',
        site: '',
        necessaryPhone: ''
      }
    }
  }

  submit(): void {
    this.isLoading = true;
    this.setReq()
    this.api.editProfile(this.req).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.session.setUserToSession({ token: this.session.getToken(), user: res.data })
        this.errorsService.clear();
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
      this.errorsService.clear();
      this.errorsService.check(error);
    })
  }

  getInfo(): void {
    this.infoLoading = true;
    this.api.getProfile().subscribe((res: any) => {
      this.infoLoading = false;
      if (res.isDone) {
        this.req = res.data
        this.setValue()
      }
    }, (error: any) => {
      this.infoLoading = false;
      this.errorsService.check(error);
    })
  }

  setValue(): void {
    this.nameFC.setValue(this.req.name)
    this.usernameFC.setValue(this.req.username)
    this.familyFC.setValue(this.req.family)
    this.phoneFC.setValue(this.req.phone)
    this.emailFC.setValue(this.req.agency.email)

  }

  onCitySelected(city:any):void {
    console.log(city);
    
    this.cityFC.setValue(city.id)

  }


  changePassword(): void {
    if (this.passwordFC.value === this.retypePasswordFC.value) {
      this.forgetIsLoading = true;
      const changePasswordReq = {
        password: this.passwordFC.value,
        phone: this.session.getPhone(),
        code: this.codeFC.value
      };
      this.authApi.changePassword(changePasswordReq).subscribe((res: any) => {
        this.forgetIsLoading = false;
        if (res.isDone) {
          this.message.custom('گذرواژه شما با موفقیت تغییر یافت');
          this.errorsService.clear()
          this.passwordFC.reset();
          this.retypePasswordFC.reset()
          this.isSendCode = false
          this.codeFC.reset()
        } else {
          this.message.custom(res.message);
        }
      }, (error: any) => {
        this.forgetIsLoading = false;
        this.errorsService.recordError(error.error.data);
        this.errorsService.check(error);
      });
    } else {
      this.message.custom('گذرواژه شما با تکرار آن مطابقت ندارد');
    }
  }
}
