import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../Core/Services/session.service";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {SettingService} from "../../Core/Services/setting.service";
import {ResponsiveService} from "../../Core/Services/responsive.service";

declare let $: any;

@Component({
  selector: 'prs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  isMobile = false;
  isDesktop=false;
  isMenu=false;

  constructor(public session: SessionService,
              public settingService: SettingService,
              public api: AuthApiService,
              public message: MessageService,
              public mobileService: ResponsiveService,
              public checkError: CheckErrorService) {
    this.isMobile = mobileService.isMobile()
  }

  ngOnInit(): void {
    this.settingService.getSetting();
    $(document).ready(() => {
      $(".btn-menu-mobi").click(() => {
        $(".show-menu").addClass("under-menu")
      })
      $(".btn-exit-menu").click(() => {
        $(".show-menu").removeClass("under-menu")
      })
    })

  }
  menuOpen(){
    this.isMenu=true
  }
  menuClose(){
    this.isMenu=false
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
