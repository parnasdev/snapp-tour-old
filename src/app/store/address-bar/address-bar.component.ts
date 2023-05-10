import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'prs-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss']
})
export class AddressBarComponent implements OnInit {
  @Input() path = 'اسنپ تریپ';
  @Input() path2 = ''
  @Input() path3 = ''

  constructor() {
  }

  ngOnInit(): void {
  }

}
