import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'prs-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  ref_code: string | null = '';
  url: any = '';

  constructor(public route: ActivatedRoute,public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.ref_code = this.route.snapshot.paramMap.get('ref_code');
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://loadbalancer.iran.liara.run/api/v1/reserve/getVoucher/${this.ref_code}`);
    this.getVoucher(this.ref_code);
  }

  getVoucher(ref_code: string | null){
    // window.open(`https://loadbalancer.iran.liara.run/api/v1/reserve/getVoucher/${ref_code}`, '_blank')
  }

}
