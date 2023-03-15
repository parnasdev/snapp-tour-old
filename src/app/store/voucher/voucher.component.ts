import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'prs-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  ref_code: string | null = '';

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ref_code = this.route.snapshot.paramMap.get('ref_code');
    this.getVoucher(this.ref_code);
  }

  getVoucher(ref_code: string | null){
    window.open(`https://loadbalancer.iran.liara.run/api/v1/reserve/getVoucher/${ref_code}`, '_blank')
  }

}
