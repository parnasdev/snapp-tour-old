import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { transactionDTO } from 'src/app/Core/Models/commonDTO';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';

@Component({
  selector: 'prs-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerify = false;
  transactionId: string | null = ''
  transaction: transactionDTO = {
    amount: 0,
    bank_res: '',
    createdAt: '',
    id: '',
    resnumber: '',
    status: '',
    ref_code: '',
  };

  constructor(public route: ActivatedRoute,
    public messageService: MessageService,
    public errorService: ErrorsService,
    public api: TourApiService) {

   }

  ngOnInit(): void {
    this.transactionId = this.route.snapshot.paramMap.get('reserveId');
    this.getTransaction()
  }

  getTransaction(): void {
    this.api.getTransaction(this.transactionId).subscribe((res: any) => {
      if (res.isDone) {
        this.transaction = res.data;
        console.log(this.transaction)
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  getvoucher(refrence: string){
    window.open(`https://loadbalancer.iran.liara.run/api/v1/reserve/getVoucher/${refrence}`, '_blank')
  }

}
