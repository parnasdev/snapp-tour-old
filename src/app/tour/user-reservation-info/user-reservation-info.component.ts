import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'prs-user-reservation-info',
  templateUrl: './user-reservation-info.component.html',
  styleUrls: ['./user-reservation-info.component.scss']
})
export class UserReservationInfoComponent implements OnInit {

  tourId = '';

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.tourId = this.route.snapshot.paramMap.get('userId');
  }

}
