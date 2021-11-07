import {Component, OnInit} from '@angular/core';
import {UserCreateReq, UserReqDTO, UserRolesDTO} from "../../Core/Models/UserDTO";
import {FormBuilder, FormControl} from "@angular/forms";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {PublicService} from "../../Core/Services/public.service";
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {MessageService} from "../../Core/Services/message.service";
import {UserApiService} from "../../Core/Https/user-api.service";
import {ServiceDTO} from "../../Core/Models/hotelDTO";
import {installTempPackage} from "@angular/cli/utilities/install-package";

export interface PermissionDTO {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isMobile: any;
  isLoading = false;
  minDate = new Date(); //datepicker
  permissions: PermissionDTO[] = [];
  roles: UserRolesDTO[] = [];
  userReq: UserCreateReq = {
    name: '',
    family: '',
    phone: '',
    birthDay: '',
    password: '',
    permissions: [],
    role_id: 1
  }
  setPermissions: string[] = [];

  // chips
  editableProducts: string[] = [];

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

// chips
  onCustomItemCreating(args: any) {
    const newValue = args.text;
    this.editableProducts.unshift(newValue);
    args.customItem = newValue;
  }

  userForm = this.fb.group({
    name: new FormControl(''),
    family: new FormControl(''),
    permission: new FormControl(''),
    birthDate: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(2)
  });

  ngOnInit(): void {
    this.getRoles();
    this.getUserPermissions();
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

  getUserPermissions() {
    this.userApi.getUserPermission().subscribe((res: any) => {
      if (res.isDone) {

        res.data.forEach((x: any) => {
          this.permissions.push({name: x, checked: false})
        })
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkErrorService.check(error);
    });
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
      birthDay: this.calService.convertDate1(this.userForm.value.birthDay, 'en'),
      password: this.userForm.value.password,
      permissions: this.setPermissions,
      role_id: this.userForm.value.role_id,
    };
  }

  submit() {
    this.setReq();
    this.userApi.addUser(this.userReq).subscribe((res: any) => {
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

  changeChecked(): void {
    let result: string[] = []
    console.log(this.permissions)
    this.permissions.forEach(x => {
      if (x.checked) {
        result.push(x.name);
      }
    })
    this.setPermissions = result
    console.log(this.setPermissions)

  }

}
