import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  transactionId: string | null = '';
  formData: any;

  constructor(public mobileService: ResponsiveService,
    public session: SessionService,
    public calService: CalenderServices,
    public publicService: PublicService,
    public api: TourApiService,
    public route: ActivatedRoute,
    public messageService: MessageService,
    public errorService: ErrorsService) { }

  ngOnInit(): void {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.callPay(this.transactionId);
  }

  callPay(transactionId: any) {
    this.api.payTransaction(transactionId).subscribe((res: any) => {
      if (res.isDone) {
        debugger
        this.formData = JSON.parse(res.data);
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", this.formData.action);
        form.setAttribute("target", "_self");
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("name", "token");
        hiddenField.setAttribute("value", this.formData.inputs.Token);
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }
    });
  }

}
