import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "../../Core/Services/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RoomTypeListDTO, RoomTypeReqDTO, RoomTypeSetDTO} from "../../Core/Models/roomTypeDTO";
import {RoomTypeApiService} from "../../Core/Https/room-type-api.service";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  nameFC = new FormControl('');
  labelFC = new FormControl('');
  req!: RoomTypeSetDTO;
  listReq!: RoomTypeReqDTO;
  roomId = 0;
  roomTypes: RoomTypeListDTO[] = [];

  constructor(public message: MessageService,
              public route: ActivatedRoute,
              public router: Router,
              public dialog: MatDialog,
              public roomTypeApi: RoomTypeApiService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.roomId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : 0;
    this.getRoomTypes();
  }

  getRoomTypes(): void {
    this.setListReq();
    this.roomTypeApi.getRoomTypes(this.listReq).subscribe((res: any) => {
      if (res.isDone) {
        this.roomTypes = res.data;
        this.fillData();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  fillData() {
    const roomItem = this.roomTypes.find((x: any) => x.id === +this.roomId);
    // @ts-ignore
    this.nameFC.setValue(roomItem.name);
    // @ts-ignore
    this.labelFC.setValue(roomItem.label);
  }

  add(): void {
    this.setReq();
    this.roomTypeApi.add(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.router.navigateByUrl('/panel/roomType');
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  edit() {
    this.setReq();
    this.roomTypeApi.edit(this.req, this.roomId).subscribe((res: any) => {
      if (res.isDone) {
        this.router.navigateByUrl('/panel/roomType');
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  setReq(): void {
    this.req = {
      name: this.nameFC.value,
      label: this.labelFC.value
    }
  }

  setListReq(): void {
    this.listReq = {
      paginate: true,
      perPage: 20
    }
  }
}
