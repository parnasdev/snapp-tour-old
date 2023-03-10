import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
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
  agencyFC = new FormControl()
  emailFC = new FormControl()
  tellFC = new FormControl()
  addressFC = new FormControl()
  siteFC = new FormControl()
  crewCountFC = new FormControl()
  necessaryPhoneFC = new FormControl()
  phoneFC = new FormControl()
  logo: string | null = ''
  // LicenseFileA = '';
  LicenseFileB = '';
  infoLoading = false;
  forgetIsLoading = false;
  codeFC = new FormControl('', Validators.required);
  passwordFC = new FormControl('', Validators.required);
  retypePasswordFC = new FormControl('', Validators.required);
  isSendCode = false
  userForm = this.fb.group({
    name: this.nameFC,
    family: this.familyFC,
    username: this.usernameFC,
    agency: this.agencyFC,
    email: this.emailFC,
    address: this.addressFC,
    tell: this.tellFC,
    site: this.siteFC,
    crewCount: this.crewCountFC,
    necessaryPhone: this.necessaryPhoneFC
  });
  isLoading = false
  req: ProfileDTO = {
    name: '',
    username: '',
    city: 0,
     gender: 0,
     birthDay: '',
     createdAt: '',
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
      crewCount: 0,
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
      city: 0,
      gender :0,
      birthDay: '',
      createdAt:'',
      role: '',
      phone: this.phoneFC.value,
      agency: {
        name: this.agencyFC?.value,
        logo: this.logo,
        LicenseFileA: null,
        id: this.req.agency?.id,
        LicenseFileB: null,
        email: this.emailFC.value,
        address: this.addressFC.value,
        tell: this.tellFC.value,
        site: this.siteFC.value,
        crewCount: +this.crewCountFC.value,
        necessaryPhone: this.necessaryPhoneFC.value
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
        this.session.setUserToSession({token: this.session.getToken(),user :res.data})
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
    this.agencyFC.setValue(this.req.agency.name)
    this.emailFC.setValue(this.req.agency.email)
    this.addressFC.setValue(this.req.agency.address)
    this.tellFC.setValue(this.req.agency.tell)
    this.siteFC.setValue(this.req.agency.site)
    this.crewCountFC.setValue(this.req.agency.crewCount)
    this.necessaryPhoneFC.setValue(this.req.agency.necessaryPhone)
    // this.LicenseFileA = this.req.agency.LicenseFileA
    // this.LicenseFileB = this.req.agency.LicenseFileB
    this.logo = this.req.agency.logo;
  }



  getLogo(files: any): void {
    // for (const event of files.target.files) {
    //   const size = event.size / 1000 / 1000;

    //   if (size < 2) {
    //     // @ts-ignore
    //     this.commonApi.singleFileUpload(event).pipe(
    //       map((event: any) => {
    //         if (event.type === HttpEventType.UploadProgress) {
    //           // this.fileProgress = Math.round(event.loaded * 100 / event.total);
    //         } else if (event.type === HttpEventType.Response) {
    //           return event;
    //         }
    //       }),
    //       catchError((error: HttpErrorResponse) => {
    //         this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //         // this.fileProgress = 0
    //         // this.isUpload = false;
    //         return of(`upload failed.`);
    //       })).subscribe((event: HttpResponse<any>) => {
    //       // this.fileLoading = false

    //       if (event === undefined) {
    //       } else {
    //         this.logo = event.body.data;
    //         // this.isUpload = true;
    //       }
    //     }, error => {
    //       // this.isUpload = false;
    //       this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //     });
    //   }else {
    //     this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');

    //   }
    // }

  }

  getLicenseA(files: any): void {
    // for (const event of files.target.files) {
    //   const size = event.size / 1000 / 1000;
    //
    //   if (size < 2) {
    //     this.commonApi.singleFileUpload(event).pipe(
    //       map((event: any) => {
    //         if (event.type === HttpEventType.UploadProgress) {
    //           // this.fileProgress = Math.round(event.loaded * 100 / event.total);
    //         } else if (event.type === HttpEventType.Response) {
    //           return event;
    //         }
    //       }),
    //       catchError((error: HttpErrorResponse) => {
    //         this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //         // this.fileProgress = 0
    //         // this.isUpload = false;
    //         return of(`upload failed.`);
    //       })).subscribe((event: HttpResponse<any>) => {
    //       // this.fileLoading = false
    //
    //       if (event === undefined) {
    //       } else {
    //         // this.LicenseFileA = event.body.data;
    //         // this.isUpload = true;
    //       }
    //     }, error => {
    //       // this.isUpload = false;
    //       this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //     });
    //   } else {
    //     this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');
    //
    //   }
    // }
  }

  getLicenseB(files: any): void {
    // for (const event of files.target.files) {
    //   const size = event.size / 1000 / 1000;
    //
    //   if (size < 2) {
    //   this.commonApi.singleFileUpload(event).pipe(
    //     map((event: any) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         // this.fileProgress = Math.round(event.loaded * 100 / event.total);
    //       } else if (event.type === HttpEventType.Response) {
    //         return event;
    //       }
    //     }),
    //     catchError((error: HttpErrorResponse) => {
    //       this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //       // this.fileProgress = 0
    //       // this.isUpload = false;
    //       return of(`upload failed.`);
    //     })).subscribe((event: HttpResponse<any>) => {
    //     // this.fileLoading = false
    //
    //     if (event === undefined) {
    //     } else {
    //       this.LicenseFileB = event.body.data;
    //       // this.isUpload = true;
    //     }
    //   }, error => {
    //     // this.isUpload = false;
    //     this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //   });
    // }
    //   else {
    //     this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');
    //
    //   }
    // }
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
