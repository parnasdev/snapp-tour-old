import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'prs-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // this.redirect()
  }
  //
  // redirect(): void {
  //   this.api.redirector(window.location.pathname).subscribe((res: any) => {
  //     if (res.isDone) {
  //       if (res.data) {
  //         this.router.navigateByUrl(res.data);
  //       }
  //     }
  //   })
  // }

}
