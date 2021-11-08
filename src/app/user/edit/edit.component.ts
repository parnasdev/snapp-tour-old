import {Component, OnInit} from '@angular/core';
import {PermissionDTO, UserCreateReq, UserResDTO, UserRolesDTO} from "../../Core/Models/UserDTO";
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
  permissions: PermissionDTO[] = [];
  userPermissions: PermissionDTO[] = [];
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
  show = false
  nameFC = new FormControl();
  familyFC = new FormControl()
  usernameFC = new FormControl();
  birthdayFC = new FormControl();
  phoneFC = new FormControl();
  roleFC=new FormControl();
  passwordFC=new FormControl();

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



  ngOnInit(): void {
    // @ts-ignore
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUser();
    this.getRoles();
    this.getAllPermissions();
  }

  getUser(): void {
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

  fillForm(): void {
    this.nameFC.setValue(this.userInfo.name);
    this.familyFC.setValue(this.userInfo.family);
    this.phoneFC.setValue(this.userInfo.phone);
    this.birthdayFC.setValue(this.userInfo.birthDay);
    this.setRoleId()
    this.setPermission();
  }

  setRoleId(): void {
    this.roles.forEach(item => {
      if (this.userInfo.role === item.name) {
        this.roleFC.setValue(item.id);
      }
    })
  }

  setPermission() {

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

  getAllPermissions(): void {
    this.userApi.getUserPermission().subscribe((res: any) => {
      if (res.isDone) {
        res.data.forEach((x: any) => {
          const item = {
            name: x,
            checked: false
          }
          this.permissions.push(item)
        })
        this.getUserPermissionWithId();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });
  }


  getUserPermissionWithId(): void {
    this.userApi.getUserPermissionWithId(+this.userId).subscribe((res: any) => {
      if (res.isDone) {
        res.data.forEach((x: any) => {
          this.userPermissions.push({name: x, checked: false})
        })
        this.calculateChecking()
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });

  }

  calculateChecking(): void {
    this.permissions.forEach((x: any) => {
      this.userPermissions.forEach((y: any) => {
        if (x.name === y.name) {
          x.checked = true;
        }
      });
    });
    console.log(this.permissions)
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
      name: this.nameFC.value,
      family: this.familyFC.value,
      phone: this.phoneFC.value,
      username: this.usernameFC.value,
      birthDay: this.birthdayFC.value,
      password: this.passwordFC.value,
      permissions: this.setPermissions,
      role_id: this.roleFC.value,
    };
  }

  submit() {
    this.setReq();
    this.userApi.editUser(this.userReq, this.userId).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.router.navigate(['/panel/user/list']);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        // this.markFormGroupTouched(this.userForm);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  changeChecked(): void {

    let result: string[] = []
    this.permissions.forEach(x => {
      if (x.checked) {
        result.push(x.name);
      }
    })
    this.setPermissions = result
  }

}
