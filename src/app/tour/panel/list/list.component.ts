import {Component, OnInit} from '@angular/core';
declare let $: any;
@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
 $(document).ready( () => {
  $(".item:even").css('background' , '#e6e6e6')
   $(".item:odd").css('background' , '#f4f7fa')
 })
  }

}
