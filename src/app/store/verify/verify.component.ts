import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'prs-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerify = false;
  slug: string | null = ''
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('reserveId');
  }

}
