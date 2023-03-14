import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prs-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerify = false;

  constructor() { }

  ngOnInit(): void {
  }

}
