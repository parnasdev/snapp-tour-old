import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { SessionService } from 'src/app/Core/Services/session.service';
import { UserApiService } from 'src/app/Core/Https/user-api.service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { UserReqDTO, UserResDTO } from 'src/app/Core/Models/UserDTO';
import { AlertDialogComponent, AlertDialogDTO } from 'src/app/common-project/alert-dialog/alert-dialog.component';

declare var $: any;
@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userReq: UserReqDTO = {
    paginate: true,
    perPage: 20,
  };
  users: UserResDTO[] = [];
  loading = false;
  city = '';

  constructor(public userApi: UserApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public calService: CalenderServices,
              public dialog: MatDialog,
              public session: SessionService,
              public errorService: ErrorsService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".item:even").css('background', '#e6e6e6')
      $(".item:odd").css('background', '#f4f7fa')
    })
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userApi.getUsers(this.userReq).subscribe((res: any) => {
      if (res.isDone) {
        this.users = res.data
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }
  deleteClicked(userId: number):void {
    const obj: AlertDialogDTO = {
      description: 'حذف شود؟',
      icon: 'null',
      title: 'اطمینان دارید'
    };
    const dialog = this.dialog.open(AlertDialogComponent, {
      width: '30%',
      data: obj
    });
    dialog.afterClosed().subscribe((result:any) => {
      if (result) {
        this.deleteUser(userId)
      }
    });
  }


  deleteUser(userId: number): void {
    this.loading = true;
    this.userApi.deleteUser(userId).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('کاربر مورد نظر حذف شد');
        this.getUsers();
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  getRoleFa(role: string) {
    switch (role) {
      case 'Admin':
        return 'ادمین'
      case 'Staff':
        return 'کارمند'
      case 'User':
        return 'کاربر'
      default:
        return '-'
    }
  }

}
