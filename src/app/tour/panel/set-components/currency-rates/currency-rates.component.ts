import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.scss']
})
export class CurrencyRatesComponent implements OnInit {

  //public Variable
  isMobile;

  constructor(
    public setService: SetTourService,
    public message: MessageService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public session: SessionService,
    public publicServices: PublicService,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }

  ngOnInit() {
  }

}
