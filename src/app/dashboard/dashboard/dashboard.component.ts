import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
