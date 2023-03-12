import {Component, OnInit} from '@angular/core';
import { UserResDTO } from 'src/app/Core/Models/UserDTO';
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends AddComponent implements OnInit {

  userId = '';
  userInfo!: UserResDTO;

  ngOnInit(): void {
    // @ts-ignore
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUser();
    this.getRoles();
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
    this.userForm.controls.name.setValue(this.userInfo.name);
    this.userForm.controls.family.setValue(this.userInfo.family);
    this.userForm.controls.phone.setValue(this.userInfo.phone);
    this.userForm.controls.birthDate.setValue(this.userInfo.birthDay);
    this.userForm.controls.username.setValue(this.userInfo.username);
  }



  submit() {
    this.setReq();
    this.userApi.editUser(this.userReq, this.userId).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
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

}
