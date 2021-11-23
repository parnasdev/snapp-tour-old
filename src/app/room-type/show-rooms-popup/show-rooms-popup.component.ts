import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomTypeListDTO, RoomTypePriceDTO} from "../../Core/Models/roomTypeDTO";

@Component({
  selector: 'prs-show-rooms-popup',
  templateUrl: './show-rooms-popup.component.html',
  styleUrls: ['./show-rooms-popup.component.scss']
})
export class ShowRoomsPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowRoomsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomTypePriceDTO[],) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
