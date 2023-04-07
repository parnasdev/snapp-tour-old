import { Component, OnInit } from '@angular/core';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.scss']
})
export class CurrencyRatesComponent implements OnInit {

  constructor(
    public setService: SetTourService,
  ) {
  }
  ngOnInit() { }


  updatePackagePrices() {}
}