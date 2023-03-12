import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {RoomTypeListDTO, RoomTypeReqDTO} from "../../Core/Models/roomTypeDTO";
import {RoomTypeApiService} from "../../Core/Https/room-type-api.service";
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  req!: RoomTypeReqDTO;
  roomTypes: RoomTypeListDTO[] = [];

  constructor(public roomTypeApi: RoomTypeApiService,
    public session: SessionService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRoomTypes(): void {
    this.setReq();
    this.roomTypeApi.getRoomTypes(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.roomTypes = res.data;
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  setReq(): void {
    this.req = {
      paginate: true,
      perPage: 20
    }
  }

  deleteRoom(id: number) {
    this.roomTypeApi.delete(id).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.getRoomTypes();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  checkItemPermission(item: string) {
    return !!this.session.userPermissions.find(x => x.name === item)
  }

}
