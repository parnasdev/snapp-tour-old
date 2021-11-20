import {Component, Input, OnInit} from '@angular/core';
import {TourInfoDTO, TourPackageDTO} from "../../Core/Models/tourDTO";
import {ReservePopupComponent} from "../../tour/reserve-popup/reserve-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ResponsiveService} from "../../Core/Services/responsive.service";

@Component({
  selector: 'prs-thumbnail-tour-two',
  templateUrl: './thumbnail-tour-two.component.html',
  styleUrls: ['./thumbnail-tour-two.component.scss']
})
export class ThumbnailTourTwoComponent implements OnInit {

  @Input() tourInfo!: TourInfoDTO;
  @Input() tourType = false;
  @Input() defineTour = false;

  constructor(public dialog: MatDialog,
              public responsive: ResponsiveService) {
  }

  ngOnInit(): void {
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

  getStarterPrice(): number {
    return this.tourInfo.defineTour ? this.tourInfo.packages[0].prices.single : this.tourInfo.packages[0].prices.twin;
  }


  reserve(id: number): void {
    const dialog = this.dialog.open(ReservePopupComponent, {
      width: '30%',
      data: id,

    })
    dialog.afterClosed().subscribe(result => {

    })
  }

}
