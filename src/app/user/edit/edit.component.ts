import { Component, OnInit } from '@angular/core';
import {UserCreateReq, UserResDTO, UserRolesDTO} from "../../Core/Models/UserDTO";
import {FormBuilder, FormControl} from "@angular/forms";
import {UserApiService} from "../../Core/Https/user-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {MessageService} from "../../Core/Services/message.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {PublicService} from "../../Core/Services/public.service";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  //public Variable
  isMobile: any;
  isLoading = false;
  minDate = new Date(); //datepicker
  permissions: string[] = [];
  roles: UserRolesDTO[] = [];
  userReq: UserCreateReq = {
    name: '',
    family: '',
    username: '',
    phone: '',
    password: '',
    birthDay: '',
    permissions: [],
    role_id: 1
  }
  setPermissions: string[] = [];
  userId = '';
  userInfo!: UserResDTO;

  constructor(public fb: FormBuilder,
              public userApi: UserApiService,
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
    username: new FormControl(''),
    birthDay: new FormControl(''),
    phone: new FormControl(''),
    role_id: new FormControl(2)
  });

  ngOnInit(): void {
    // @ts-ignore
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUser();
    this.getRoles();
    this.getUserPermissions();
  }

  getUser(): void{
    this.userApi.getUser(this.userId).subscribe((res: any) => {
      if (res.isDone) {
        this.userInfo = res.data;
        this.fillForm();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  fillForm(): void{
    this.userForm.controls.name.setValue(this.userInfo.name);
    this.userForm.controls.family.setValue(this.userInfo.family);
    this.userForm.controls.phone.setValue(this.userInfo.phone);
    this.userForm.controls.birthDay.setValue(this.userInfo.birthDay);
    this.setRoleId()
  }

  setRoleId(): void{
    this.roles.forEach(item => {
      if (this.userInfo.role === item.name){
        this.userForm.controls.role_id.setValue(item.id);
      }
    })
  }

  getRoles(): void {
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

  getUserPermissions() {
    this.userApi.getUserPermission().subscribe((res: any) => {
      if (res.isDone) {
        this.permissions = res.data;
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  addPermission(event: any) {
    this.setPermissions.push(event.target.value);
  }

  private markFormGroupTouched(formGroup: any) {
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
      phone: this.userForm.value.phone,
      username: this.userForm.value.username,
      birthDay: this.userForm.value.birthDay,
      password: this.userForm.value.password,
      permissions: this.setPermissions,
      role_id: this.userForm.value.role_id,
    };
  }

  submit() {
    this.setReq();
    this.userApi.editUser(this.userReq, this.userId).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.userForm.reset();
        this.router.navigate(['/panel/user/list']);
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

}
