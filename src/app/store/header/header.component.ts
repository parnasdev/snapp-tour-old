import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
  selector: 'prs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".ul-menu").on("click", "li", () => {
      $("li").removeClass("icon-active-header-click");
      $(this).addClass("icon-active-header-click");
      })
    })
  }

}
