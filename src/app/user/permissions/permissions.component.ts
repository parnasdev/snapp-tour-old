import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {PermissionDTO} from "../../Core/Models/UserDTO";
import {UserApiService} from "../../Core/Https/user-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";

@Component({
  selector: 'prs-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  allPermissions: PermissionDTO[] = [];
  userPermissions: PermissionDTO[] = [];
  @Input() userId: string = '';
  @Output() setPermissions = new EventEmitter<string[]>();


  constructor(public userApi: UserApiService,
              public message: MessageService,
              public checkError: CheckErrorService) {
  }

  ngOnInit(): void {
    this.getAllPermissions();
  }

  changeChecked(): void {
    let result: string[] = []
    this.allPermissions.forEach(x => {
      if (x.checked) {
        result.push(x.name);
      }
    })
    this.setPermissions.emit(result);
  }

  calculateChecking(): void {
    this.allPermissions.forEach((x: any) => {
      this.userPermissions.forEach((y: any) => {
        if (x.name === y.name) {
          x.checked = true;
        }
      });
    });
    this.changeChecked()

  }

  getUserPermissionWithId(): void {
    this.userApi.getUserPermissionWithId(+this.userId).subscribe((res: any) => {
      if (res.isDone) {
        res.data.forEach((x: any) => {
          this.userPermissions.push({name: x.name, label: x.label, checked: false})
        })
        this.calculateChecking()
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkError.check(error);
    });

  }

  getAllPermissions(): void {
    this.userApi.getUserPermission().subscribe((res: any) => {
      if (res.isDone) {
        res.data.forEach((x: any) => {
          const item = {
            name: x.name,
            label: x.label,
            checked: false
          }
          this.allPermissions.push(item)
        })
        if (this.userId !== ''){
          this.getUserPermissionWithId();
        }
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkError.check(error);
    });
  }

}
