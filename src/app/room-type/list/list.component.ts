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

  paginateConfig: any;
  paginate: any;
  p = 1;

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
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
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
      perPage: 20,
      page: this.p
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

  onPageChanged(event: any) {
    this.p = event;
    this.getRoomTypes();
  }

}
