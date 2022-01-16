import { Component, OnInit } from '@angular/core';
import {SettingService} from "../../Core/Services/setting.service";
declare let $: any;
@Component({
  selector: 'prs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public setting: SettingService) { }

  ngOnInit(): void {
    const btn = $('#button');
    $(window).scroll(() => {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', (e: any) => {
      e.preventDefault();
      $("html").animate({scrollTop: 0}, '300');
    });
  }

}
