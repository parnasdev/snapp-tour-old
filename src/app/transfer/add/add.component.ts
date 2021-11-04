import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {FormControl} from "@angular/forms";
import {TransferAPIService} from "../../Core/Https/transfer-api.service";
import {TransferSetRequestDTO} from "../../Core/Models/transferDTO";
import {Router} from "@angular/router";
import {UploadSingleComponent} from "../../common-project/upload-single/upload-single.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  nameFC = new FormControl();
  statusFC = new FormControl();
  req!: TransferSetRequestDTO
  logo: string = '';

  constructor(public message: MessageService,
              public router: Router,
              public dialog: MatDialog,
              public api: TransferAPIService) {}

  ngOnInit(): void {}

  getFile(res: any): void {
    console.log(res)
    if (res) {
      this.message.showMessageBig('فایل شما با موفقیت آپلود شد.');
      this.logo = res
    }
  }

  submit(): void {
    this.setReq()
    this.api.add(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.router.navigateByUrl('/panel/transfer');
      }else {
        this.message.custom(res.message);
      }
    },(error:any) => {
      this.message.error()
    })
  }

  getThumbnail(): void {
    const dialog = this.dialog.open(UploadSingleComponent, {});
    dialog.afterClosed().subscribe(result => {
      console.log(result);
      this.logo = result
    })
  }


  setReq(): void {
    this.req = {
      logo: this.logo,
      name: this.nameFC.value,
      type: 1
    }
  }

}
