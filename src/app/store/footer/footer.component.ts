import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'prs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

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
