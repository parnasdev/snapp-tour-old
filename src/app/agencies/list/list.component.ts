import {Component, OnInit} from '@angular/core';
import {AgencyApiService} from 'src/app/Core/Https/agency-api.service';
import {AgencyDTO} from 'src/app/Core/Models/AgencyDTO';
import {ErrorsService} from 'src/app/Core/Services/errors.service';
import {MessageService} from 'src/app/Core/Services/message.service';
import {MatDialog} from "@angular/material/dialog";
import {UserAgencyDTO, UserAgencyListComponent} from "../user-agency-list/user-agency-list.component";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: AgencyDTO[] = []

  constructor(public api: AgencyApiService,
              public errorService: ErrorsService,
              public dialog: MatDialog,
              public message: MessageService,) {
  }

  ngOnInit() {
    this.getList()
  }

  getList(): void {
    this.api.getAgencies().subscribe((res: any) => {
      if (res.isDone) {
        this.list = res.data
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  changeStatus(id: number, isVerify: boolean): void {
    this.api.verifyAgency(id, isVerify).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.getList()
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  deleteClicked(id: number): void {
    this.api.deleteAgency(id).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.getList();
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  openUsers(users: any[],id: number): void {
    const dialog = this.dialog.open(UserAgencyListComponent, {
      width: '80%',
      data: {
        users: users,
        agencyID: id
      }
    })
  }
}
