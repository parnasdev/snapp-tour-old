import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {RoomTypeListDTO, RoomTypePriceDTO, RoomTypeReqDTO} from "../../Core/Models/roomTypeDTO";
import {RoomTypeApiService} from "../../Core/Https/room-type-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'prs-set-price-popup',
  templateUrl: './set-price-popup.component.html',
  styleUrls: ['./set-price-popup.component.scss']
})
export class SetPricePopupComponent implements OnInit {

  nameFC = new FormControl('');
  labelFC = new FormControl('');
  req!: RoomTypeReqDTO;
  roomTypes: RoomTypeListDTO[] = [];

  tourDetail: any;

  constructor(public fb: FormBuilder,
              public dialogRef: MatDialogRef<SetPricePopupComponent>,
              public message: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: RoomTypePriceDTO[],
              public roomTypeApi: RoomTypeApiService) {
  }

  form = this.fb.group({
    rooms: this.fb.array([], Validators.required)
  });

  ngOnInit(): void {
    debugger
    this.getRoomTypes();
    if (this.data && this.data.length > 0) {
      this.setFormArray();
    }
  }

  setFormArray(): void {
    debugger
    this.RoomForm.clear();
    this.data.forEach(x => {
      this.addRow(x);
    })
  }

  get RoomForm() {
    return this.form.get('rooms') as FormArray;
  }

  submit() {
    this.tourDetail = [];
    this.RoomForm.controls.forEach((item, index) => {
      this.tourDetail.push({
        name: item.value.name,
        price: item.value.price
      });
    })
    this.dialogRef.close(this.tourDetail);
  }

  getRoomTypes(): void {
    this.setReq();
    this.roomTypeApi.getRoomTypes(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.roomTypes = res.data;
        if(this.data.length === 0) {
          this.addRow();
        }
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  addRow(item?: RoomTypePriceDTO) {
    const rooms = this.fb.group({
      name: [item ? item.name : ''],
      price: [item ? item.price : ''],
    });
    this.RoomForm.push(rooms);
  }

  removePackage(i: any) {
    this.RoomForm.removeAt(i);
  }


  setReq(): void {
    this.req = {
      paginate: true,
      perPage: 20
    }
  }

}
