import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'prs-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
  @Input() label = 'ثبت'
  @Input() background = 'blue' // dark or blue

  constructor() {
  }

  ngOnInit(): void {
  }

}
