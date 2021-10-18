import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../Core/Services/session.service";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";

declare let $: any;

@Component({
  selector: 'prs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading = false;

  constructor(public session: SessionService,
              public api: AuthApiService,
              public message: MessageService,
              public checkError: CheckErrorService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".ul-menu").on("click", "li", () => {
      $("li").removeClass("icon-active-header-click");
      $(this).addClass("icon-active-header-click");
      })
    })
  }


  logOut(): void {
    this.isLoading = true
    this.api.logout().subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.removeUser();
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
      this.checkError.check(error);
    })
  }


}
