import {Component, Inject, OnInit} from '@angular/core';
import {UserResDTO} from "../../Core/Models/UserDTO";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CalenderServices} from "../../Core/Services/calender-service";

export interface UserAgencyDTO {
  family: string
  id: number
  isManager: boolean
  name: string
  phone: string
}

@Component({
  selector: 'prs-user-agency-list',
  templateUrl: './user-agency-list.component.html',
  styleUrls: ['./user-agency-list.component.scss']
})
export class UserAgencyListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserAgencyListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                users: UserAgencyDTO[],
                agencyID: number
              },
              public calService: CalenderServices,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
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
