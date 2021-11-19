import {Component, Input, OnInit} from '@angular/core';
import {TourInfoDTO, TourPackageDTO} from "../../Core/Models/tourDTO";
import {ReservePopupComponent} from "../../tour/reserve-popup/reserve-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'prs-thumbnail-tour-two',
  templateUrl: './thumbnail-tour-two.component.html',
  styleUrls: ['./thumbnail-tour-two.component.scss']
})
export class ThumbnailTourTwoComponent implements OnInit {

  @Input() packages: TourPackageDTO[] = [];
  @Input() tourType = false;
  @Input() defineTour = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getStars(count: string): number[]{
    return Array.from(Array(+count).keys());
  }


  reserve(id: number):void {
    const dialog = this.dialog.open(ReservePopupComponent, {
      data: id
    })
    dialog.afterClosed().subscribe(result => {

    })
  }

}
