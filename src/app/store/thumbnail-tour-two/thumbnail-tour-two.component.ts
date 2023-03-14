import {Component, Input, OnInit} from '@angular/core';
import {TourInfoDTO, TourPackageDTO} from "../../Core/Models/tourDTO";
import {ReservePopupComponent} from "../../tour/reserve-popup/reserve-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {ShowRoomsPopupComponent} from "../../room-type/show-rooms-popup/show-rooms-popup.component";
import {RoomTypeListDTO, RoomTypePriceDTO} from "../../Core/Models/roomTypeDTO";
import {AuthPopupComponent} from 'src/app/auth/auth-popup/auth-popup.component';
import {MessageService} from 'src/app/Core/Services/message.service';
import {TourApiService} from 'src/app/Core/Https/tour-api.service';
import {SessionService} from 'src/app/Core/Services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'prs-thumbnail-tour-two',
  templateUrl: './thumbnail-tour-two.component.html',
  styleUrls: ['./thumbnail-tour-two.component.scss']
})
export class ThumbnailTourTwoComponent implements OnInit {
  isMobile = false;
  @Input() tourInfo!: TourInfoDTO;
  @Input() tourType = false;
  @Input() defineTour = false;
  clicked  =false;
  constructor(public dialog: MatDialog,
              public message: MessageService,
              public tourApi: TourApiService,
              public session: SessionService,
              public router: Router,
              public responsive: ResponsiveService) {
    this.isMobile = responsive.isMobile()
  }

  ngOnInit(): void {
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }


  getStarterPrice(index: number): string {
    if (this.tourInfo.packages.length) {
      return this.tourInfo.defineTour ? this.tourInfo.packages[index].prices.twinRate : this.tourInfo.packages[index].prices.twin;
    } else {
      return '0';
    }
  }

  checkReserve(packageId: number) {
    this.clicked = true;
    this.session.isLoggedIn() ? this.getReserve(packageId) : this.loginPopup(packageId)
  }

  loginPopup(id: number): void {
    const dialog = this.dialog.open(AuthPopupComponent, {
      width: this.isMobile ? '95%' : '30%',
      maxWidth: this.isMobile ? '95%' : '30%',
      data: id,
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.message.custom('ورود شما با موفقیت انجام شد')
        this.getReserve(id)
      }
    })

    // const dialog = this.dialog.open(ReservePopupComponent, {
    //   width: '30%',
    //   data: id,

    // })
    // dialog.afterClosed().subscribe(result => {

    // })

  }

  openRoom(rooms: RoomTypePriceDTO[]): void {
    const dialog = this.dialog.open(ShowRoomsPopupComponent, {
      width: this.isMobile ? '95%' : '30%',
      maxWidth: this.isMobile ? '95%' : '30%',

      data: rooms,
    })
    dialog.afterClosed().subscribe(result => {

    })
  }

  getReserve(packageId: number): void {
    const req = {
      package_id: packageId,
    }
    this.tourApi.reserve(req).subscribe((res: any) => {
      if (res.isDone) {
        // this.message.custom(res.message);
        this.router.navigate(['/dashboard/tour/info/' + res.data.reserve_id]);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }
}
