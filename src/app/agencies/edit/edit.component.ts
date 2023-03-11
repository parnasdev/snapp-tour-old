import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ErrorsService } from "../../Core/Services/errors.service";
import { MessageService } from "../../Core/Services/message.service";

import { AuthApiService } from "../../Core/Https/auth-api.service";
import { CommonApiService } from "../../Core/Https/common-api.service";
import { PublicService } from "../../Core/Services/public.service";
import { SessionService } from "../../Core/Services/session.service";
import { AgencyEditReqDTO } from "../../Core/Models/AgencyDTO";
import { AgencyApiService } from "../../Core/Https/agency-api.service";
import { ActivatedRoute } from "@angular/router";
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { UserApiService } from 'src/app/Core/Https/user-api.service';
import { CityResponseDTO } from 'src/app/Core/Models/cityDTO';

export interface UploadResDTO {
  path: string;
  url: string
}
@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id = ''
  public show = true;

  nameFC = new FormControl('')
  familyFC = new FormControl('')
  cityFC = new FormControl('');
  emailFC = new FormControl('');
  genderFC = new FormControl('');
  idCodeFC = new FormControl('');


  agencyNameFC = new FormControl('');
  usernameFC = new FormControl('')
  agencyFC = new FormControl('');
  agencyEmailFC = new FormControl()
  tellFC = new FormControl()
  addressFC = new FormControl()
  siteFC = new FormControl()
  crewCountFC = new FormControl()
  necessaryPhoneFC = new FormControl()
  // phoneFC = new FormControl()

  logo: UploadResDTO | null = {
    path: '',
    url: ''
  };
  LicenseFileA: UploadResDTO | null = {
    path: '',
    url: ''
  };
  LicenseFileB: UploadResDTO | null = {
    path: '',
    url: ''
  };;
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
  isLoading = false;
  fileProgress = 0;
  isUpload = false
  fileLoading = false
  req: AgencyEditReqDTO = {
    username: '',
    family: '',
    name: '',
    phone: '',
    city: 0,
    email: '',
    gender: '',
    id_code: '',
    agency: {
      name: '',
      logo: '',
      isManager: null,
      LicenseFileA: '',
      id: 0,
      LicenseFileB: '',
      extra: '',
      email: '',
      address: '',
      tell: '',
      site: '',
      necessaryPhone: '',
    },
    birthDay: '',
    createdAt: '',
    role: '',
  }

  info: any = {
    user: {
      username: '',
      family: '',
      name: '',
      city: 0,
      gender: 0,
      phone: '',
      agency: {
        name: '',
        logo: null,
        isManager: null,
        LicenseFileA: '',
        id: 0,
        LicenseFileB: '',
        email: '',
        address: '',
        tell: '',
        site: '',
        necessaryPhone: '',
      },
      birthDay: '',
      createdAt: '',
      role: '',
    },
    token: ''
  }

  constructor(public fb: FormBuilder,
    public api: AgencyApiService,
    public authApi: AuthApiService,
    public dialog: MatDialog,
    public userApi: UserApiService,
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

    if (this.session.getRole() === 'Admin') {
      this.getAgency();
    }else {
      this.getInfo();
    }

  }


  setReq(): void {
    this.req = {
      username: '',
      family: this.familyFC.value,
      name: this.nameFC.value,
      phone: this.session.getPhone(),
      city: this.cityFC.value,
      email: this.emailFC.value,
      id_code: this.idCodeFC.value,
      gender: this.genderFC.value,
      agency: {
        name: this.agencyNameFC?.value,
        logo: this.logo ? this.logo.path : '',
        isManager: null,
        LicenseFileA: this.LicenseFileA ? this.LicenseFileA.path : '',
        id: 0,
        extra: '',
        LicenseFileB: this.LicenseFileB ? this.LicenseFileB.path : '',
        email: this.emailFC.value,
        address: this.addressFC.value,
        tell: this.tellFC.value,
        site: this.siteFC.value,
        necessaryPhone: this.necessaryPhoneFC.value,
      },
      birthDay: this.session.getBirthday(),
      createdAt: '',
      role: this.session.getRole(),
    }
  }


  submit(): void {
    this.isLoading = true;
    this.setReq()
    this.api.editAgency(this.req).subscribe((res: any) => {
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
    this.userApi.getProfile().subscribe((res: any) => {
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
  getAgency(): void {
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


  citySelected(city: CityResponseDTO): void {
    this.cityFC.setValue(city.id)
  }
  setValue(): void {
    this.nameFC.setValue(this.info.name)
    this.emailFC.setValue(this.info.email)
    this.familyFC.setValue(this.info.family)
    this.idCodeFC.setValue(this.info.idCode)
    this.cityFC.setValue(this.info.city.slugEn);
    this.reload();

    this.LicenseFileA = this.info.agency.LicenseFileA
    this.LicenseFileB = this.info.agency.LicenseFileB
    this.logo = this.info.agency.logo
    this.agencyNameFC.setValue(this.info.agency.name)
    this.agencyEmailFC.setValue(this.info.agency.email)
    this.genderFC.setValue(this.info.gender)
    this.addressFC.setValue(this.info.agency.address)
    this.idCodeFC.setValue(this.info.id_code)
    this.tellFC.setValue(this.info.agency.tell)
    this.siteFC.setValue(this.info.agency.site)
    this.necessaryPhoneFC.setValue(this.info.agency.necessaryPhone)

  }

  getLogo(files: any): void {
    for (const event of files.target.files) {
      const size = event.size / 1000 / 1000;

      if (size < 2) {
        this.commonApi.singleFileUpload(event).pipe(
          map((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              // this.fileProgress = Math.round(event.loaded * 100 / event.total);
            } else if (event.type === HttpEventType.Response) {
              return event;
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
            // this.fileProgress = 0
            // this.isUpload = false;
            return of(`upload failed.`);
          })).subscribe((event: HttpResponse<any>) => {
            // this.fileLoading = false

            if (event === undefined) {
            } else {
              this.logo = event.body.data;
              // this.isUpload = true;
            }
          }, error => {
            // this.isUpload = false;
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
          });
      } else {
        this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');

      }
    }

  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  getLicenseA(files: any): void {
    for (const event of files.target.files) {
      const size = event.size / 1000 / 1000;

      if (size < 2) {
        this.commonApi.singleFileUpload(event).pipe(
          map((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.fileProgress = Math.round(event.loaded * 100 / event.total);
            } else if (event.type === HttpEventType.Response) {
              return event;
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
            this.fileProgress = 0
            this.isUpload = false;
            return of(`upload failed.`);
          })).subscribe((event: HttpResponse<any>) => {
            this.fileLoading = false

            if (event === undefined) {
            } else {
              this.LicenseFileA = event.body.data;
              this.isUpload = true;
            }
          }, (error: any) => {
            this.isUpload = false;
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
          });
      } else {
        this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');

      }
    }
  }

  getLicenseB(files: any): void {
    for (const event of files.target.files) {
      const size = event.size / 1000 / 1000;

      if (size < 2) {
        this.commonApi.singleFileUpload(event).pipe(
          map((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.fileProgress = Math.round(event.loaded * 100 / event.total);
            } else if (event.type === HttpEventType.Response) {
              return event;
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
            this.fileProgress = 0
            this.isUpload = false;
            return of(`upload failed.`);
          })).subscribe((event: HttpResponse<any>) => {
            this.fileLoading = false

            if (event === undefined) {
            } else {
              this.LicenseFileB = event.body.data;
              this.isUpload = true;
            }
          }, error => {
            this.isUpload = false;
            this.message.custom('فایل آپلود نشد مجدد تلاش کنید');
          });
      }
      else {
        this.message.custom('حجم فایل ارسالی باید کمتر از 2 مگابایت باشد');

      }
    }
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
