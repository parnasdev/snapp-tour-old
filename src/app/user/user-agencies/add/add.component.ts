import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyUserApiService } from 'src/app/Core/Https/agency-user-api.service copy';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { UserApiService } from 'src/app/Core/Https/user-api.service';
import { PermissionDTO, UserCreateReq, UserRolesDTO } from 'src/app/Core/Models/UserDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';


@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isMobile: any;
  isLoading = false;
  permissions: PermissionDTO[] = [];
  roles: UserRolesDTO[] = [];
  userReq: UserCreateReq = {
    name: '',
    family: '',
    username: '',
    phone: '',
    birthDay: '',
    password: '',
    permissions: [],
    role_id: 4
  }
  setPermissions: string[] = [];

  constructor(public fb: FormBuilder,
              public userApi: AgencyUserApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public calService: CalenderServices,
              public errorService: ErrorsService,
              public message: MessageService,
              public checkError: CheckErrorService,
              public router: Router,
              public commonApi: CommonApiService,
              public session: SessionService,
              public calenderServices: CalenderServices,
              public mobileService: ResponsiveService,
              public publicServices: PublicService) {
    this.isMobile = mobileService.isMobile();
  }

  userForm = this.fb.group({
    name: new FormControl(''),
    family: new FormControl(''),
    permission: new FormControl(''),
    birthDate: new FormControl(''),
    username: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.commonApi.getRoles().subscribe((res: any) => {
      if (res.isDone) {
        this.roles = res.data;
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  setReq() {
    this.userReq = {
      name: this.userForm.value.name,
      family: this.userForm.value.family,
      phone: this.publicServices.fixNumbers(this.userForm.value.phone),
      birthDay: this.calService.convertDate1(this.userForm.value.birthDay, 'en'),
      password: this.publicServices.fixNumbers(this.userForm.value.password),
      username: this.userForm.value.username,
      permissions: this.setPermissions,
      role_id: 4
    };
  }

  submit() {
    this.setReq();
    this.userApi.addUser(this.userReq).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.userForm.reset();
        this.router.navigate(['/panel/user-agency/list']);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.markFormGroupTouched(this.userForm);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  getPermissions(permissions: string[]) {
    this.setPermissions = permissions;
  }
}
