import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../Core/Services/errors.service";
import {MessageService} from "../../Core/Services/message.service";

import {AuthApiService} from "../../Core/Https/auth-api.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {PublicService} from "../../Core/Services/public.service";
import {SessionService} from "../../Core/Services/session.service";
import {AgencyDTO, AgencyEditDTO} from "../../Core/Models/AgencyDTO";
import {AgencyApiService} from "../../Core/Https/agency-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id = ''

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
  // phoneFC = new FormControl()
  commissionTypeFC = new FormControl(0);
  commissionFC = new FormControl(0);
  logo = ''
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
    commission : this.commissionFC,
    address: this.addressFC,
    tell: this.tellFC,
    site: this.siteFC,
    crewCount: this.crewCountFC,
    necessaryPhone: this.necessaryPhoneFC
  });
  isLoading = false
  req: AgencyEditDTO = {
    id: 0,
    commission: 0,
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
  info: AgencyDTO = {
    id: 0,
    name: '',
    users: [],
    verify: false,
    LicenseFileA: null,
    LicenseFileB: null,
    address: '',
    crewCount: 0,
    email: '',
    logo: '',
    necessaryPhone: '',
    tell: '',
    commissions: [],
    site: '',
    user: {name: '', family: ''}
  }

  constructor(public fb: FormBuilder,
              public api: AgencyApiService,
              public authApi: AuthApiService,
              public dialog: MatDialog,
              public commonApi: CommonApiService,
              public publicService: PublicService,
              public session: SessionService,
              public route: ActivatedRoute,
              public message: MessageService,
              public errorsService: ErrorsService) {
    errorsService.clear();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id')
    this.getInfo();
  }


  setReq(): void {
    this.req = {
      name: this.agencyFC?.value,
      logo: null,
      LicenseFileA: null,
      id: this.req.id,
      commission: (this.commissionTypeFC.value === 0 || this.commissionTypeFC.value === '0') ? +this.commissionFC.value : this.getCommissionPercent(+this.commissionFC.value),
      LicenseFileB: null,
      email: this.emailFC.value,
      address: this.addressFC.value,
      tell: this.tellFC.value,
      site: this.siteFC.value,
      crewCount: +this.crewCountFC.value,
      necessaryPhone: this.necessaryPhoneFC.value
    }
  }

  submit(): void {
    this.isLoading = true;
    this.setReq()
    this.api.editAgency(this.req, +this.id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.session.setUserToSession({token: this.session.getToken(), user: res.data})
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
    this.api.getAgency(+this.id).subscribe((res: any) => {
      this.infoLoading = false;
      if (res.isDone) {
        this.info = res.data
        this.setValue()
      }
    }, (error: any) => {
      this.infoLoading = false;
      this.errorsService.check(error);
    })
  }

  getCommissionPercent(amount: number): number {
    return amount / 100;
  }

  setValue(): void {
    // this.nameFC.setValue(this.info.user ? this.info.user.name: '')
    // this.familyFC.setValue(this.info.user? this.info.user.family: '')
    // // this.usernameFC.setValue(this.info.)
    // // this.phoneFC.setValue(this.info.phone)
    // this.LicenseFileB = this.req.LicenseFileA
    // this.LicenseFileB = this.req.LicenseFileB
    // this.logo = this.req.logo;
    this.agencyFC.setValue(this.info.name)
    this.emailFC.setValue(this.info.email)
    this.addressFC.setValue(this.info.address)
    this.tellFC.setValue(this.info.tell)
    this.siteFC.setValue(this.info.site)
    this.crewCountFC.setValue(this.info.crewCount)
    this.necessaryPhoneFC.setValue(this.info.necessaryPhone)
    if (this.info.commission) {
      this.commissionTypeFC.setValue(this.info.commission < 1 ? 1 : 0)
      this.commissionFC.setValue(this.commissionTypeFC.value === 1? this.info.commission * 100 : this.info.commission)
    }
  }
  changeCommission():void {
    this.commissionFC.setValue(0)
  }

  getLogo(files: any): void {
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
    //         this.logo = event.body.data;
    //         // this.isUpload = true;
    //       }
    //     }, error => {
    //       // this.isUpload = false;
    //       this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
    //     });
    //   }else {
    //     this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');
    //
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
