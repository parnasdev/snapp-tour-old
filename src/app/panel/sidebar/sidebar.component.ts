import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
  selector: 'prs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
    $(document).ready(() => {
      $(
        ".menu-main-1").click(() =>{
        $(".icon-1").toggleClass("active-arrow")
      })
      $(".menu-main-2").click(() =>{
        $(".icon-2").toggleClass("active-arrow")
      })
      $(".menu-main-3").click(() =>{
        $(".icon-3").toggleClass("active-arrow")
      })
      $(".menu-main-4").click(() =>{
        $(".icon-4").toggleClass("active-arrow")
      })
      $(".menu-main-5").click(() =>{
        $(".icon-5").toggleClass("active-arrow")
      })
      $(".menu-main-6").click(() =>{
        $(".icon-6").toggleClass("active-arrow")
      })
    })
  }

  ngOnInit(): void {

  }

}
