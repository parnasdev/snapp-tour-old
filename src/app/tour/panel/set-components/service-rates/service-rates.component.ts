import { Component, OnInit } from '@angular/core';

import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-service-rates',
  templateUrl: './service-rates.component.html',
  styleUrls: ['./service-rates.component.scss']
})
export class ServiceRatesComponent implements OnInit {

  constructor(
    public setService: SetTourService) {
  }


  ngOnInit() {
  }


  updatePackagePrices() {
    
  }

}
