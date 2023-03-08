import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AgencyApiService} from "../../Core/Https/agency-api.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "../../Core/Services/message.service";
import {AgencyDTO, AgencyListUserDTO} from "../../Core/Models/AgencyDTO";

@Component({
  selector: 'prs-set-user-popup',
  templateUrl: './set-user-popup.component.html',
  styleUrls: ['./set-user-popup.component.scss']
})
export class SetUserPopupComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: new FormControl(),
    family: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    role_id: new FormControl(3),
  })
  isLoading = false;
  info: AgencyListUserDTO = {
    agency: {} as AgencyDTO,
    birthDay: '',
    createdAt: '',
    family: '',
    email: '',
    id: 0,
    name: '',
    phone: '',
    role: '',
    username: '',
  }

  userId = '';
  setPermissions: string[] = [];

  constructor(public dialogRef: MatDialogRef<SetUserPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              public dialog: MatDialog, public api: AgencyApiService,
              public errorsService: ErrorsService,
              public fb: FormBuilder,
              public message: MessageService) {}

  ngOnInit(): void {
    if (this.data !== 0) {
      this.getUser()
    }
  }

  setValue(): void {
    this.form.controls['name'].setValue(this.info.name)
    this.form.controls['family'].setValue(this.info.family)
    this.form.controls['phone'].setValue(this.info.phone)
    this.form.controls['username'].setValue(this.info.username)
    this.form.controls['email'].setValue(this.info.email)
  }

  getUser(): void {
    this.api.getUser(this.data).subscribe((res: any) => {
      if (res.isDone) {
        this.info = res.data
        this.setValue()
      }
    }, (error: any) => {
      this.errorsService.check(error);
      this.errorsService.recordError(error.error.data)
    })
  }

  set(): void {
    if (this.data !== 0) {
      this.edit()
    } else {
      this.add()
    }
  }

  edit(): void {
    this.isLoading = true
    this.api.editUser(this.form.value, this.data).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.custom(res.message);
        this.dialogRef.close(true);
      }
    }, (error: any) => {
      this.isLoading = false;
      this.errorsService.check(error);
      this.errorsService.recordError(error.error.data)
    })
  }

  add(): void {
    this.isLoading = true
    this.api.createUser(this.form.value).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.custom(res.message);
        this.dialogRef.close(true);
      }
    }, (error: any) => {
      this.isLoading = false;
      this.errorsService.check(error);
      this.errorsService.recordError(error.error.data)
    })
  }

  getPermissions(permissions: string[] | any) {
    this.setPermissions = permissions;
  }
}
