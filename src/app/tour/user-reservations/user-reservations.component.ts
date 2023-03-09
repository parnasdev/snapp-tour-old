import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../../Core/Services/responsive.service";

@Component({
  selector: 'prs-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {
  isDesktop = false;
  isMobile = false;
  isTablet = false;
  slug: string = 'dsfsf';

  constructor(
    public mobileService: ResponsiveService,
  ) {
    this.isMobile = mobileService.isTablet()
    this.isDesktop = mobileService.isDesktop()
  }

  ngOnInit(): void {
  }

}
