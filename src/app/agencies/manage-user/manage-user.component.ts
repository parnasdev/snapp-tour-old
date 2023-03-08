import {Component, OnInit} from '@angular/core';
import {AgencyListUserDTO} from "../../Core/Models/AgencyDTO";
import {AgencyApiService} from "../../Core/Https/agency-api.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {MessageService} from "../../Core/Services/message.service";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SetUserPopupComponent} from "../set-user-popup/set-user-popup.component";

@Component({
  selector: 'prs-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  list: AgencyListUserDTO[] = []
  isLoading = false;

  constructor(public api: AgencyApiService,
              public errorsService: ErrorsService,
              public fb: FormBuilder,
              public dialog: MatDialog,
              public message: MessageService,) {
  }

  ngOnInit() {
    this.getList()
  }

  getList(): void {
    this.api.getUsers().subscribe((res: any) => {
      console.log(res)
      if (res.isDone) {
        this.list = res.data
      }else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      if (error.status === 403) {
        this.message.custom(error.error.message)
      }
      this.errorsService.check(error);
    })
  }


  set(id: number = 0): void {
    const dialog = this.dialog.open(SetUserPopupComponent, {
      width: '90%',
      data: id
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getList()

      }
    })
  }
  deleteClicked(id: number) :void {
    this.message.custom('این قابلیت در دسترس نیست')
  }
}
