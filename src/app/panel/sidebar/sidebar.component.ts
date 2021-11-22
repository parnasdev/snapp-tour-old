import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {SessionService} from "../../Core/Services/session.service";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {Router} from "@angular/router";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {UserApiService} from "../../Core/Https/user-api.service";
import {PermissionDTO} from "../../Core/Models/UserDTO";

declare let $: any;

@Component({
  selector: 'prs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLoading = false
  userPermissions: PermissionDTO[] = [];

  constructor(public session: SessionService,
              public userApi: UserApiService,
              public api: AuthApiService,
              public router: Router,
              public message: MessageService,
              public checkError: CheckErrorService) {
    $(document).ready(() => {
      $(
        ".menu-main-1").click(() => {
        $(".icon-1").toggleClass("active-arrow")
      })
      $(".menu-main-2").click(() => {
        $(".icon-2").toggleClass("active-arrow")
      })
      $(".menu-main-3").click(() => {
        $(".icon-3").toggleClass("active-arrow")
      })
      $(".menu-main-4").click(() => {
        $(".icon-4").toggleClass("active-arrow")
      })
      $(".menu-main-5").click(() => {
        $(".icon-5").toggleClass("active-arrow")
      })
      $(".menu-main-6").click(() => {
        $(".icon-6").toggleClass("active-arrow")
      })
    })
  }

  ngOnInit(): void {
    this.toggleMenu()
    this.getUserPermission();
  }

  toggleMenu(): void {
    function menuClose() { //closes mobile menu
      $('.mobile-nav span, .mobile-nav span:before, .mobile-nav span:after').removeClass('open');
      setTimeout(function () {
        $('.mobile-nav span, .mobile-nav span:before, .mobile-nav span:after').removeClass('open');
      }, 100);
      $('.nav-fade').removeClass('fade-out');
      $('nav').removeClass('nav-open');
      $('nav li').removeClass('animate');
    }

    function menuOpen() { //opens mobile menu
      $('.mobile-nav span, .mobile-nav span:before, .mobile-nav span:after').addClass('open');
      setTimeout(() => {
        $('.mobile-nav span, .mobile-nav span:before, .mobile-nav span:after').addClass('open');
      }, 250);
      $('.nav-fade').addClass('fade-out');
      $('nav').addClass('nav-open');
      $('nav li').addClass('animate');
    }

    $('.mobile-nav').click(function () { //controls mobile menu behavior based on menu click event
      if ($('.mobile-nav span, .mobile-nav span:before, .mobile-nav span:after').hasClass('open')) {
        menuClose();
      } else {
        menuOpen();
      }
    });
  }

  showMessage() {
    this.message.custom('این گزینه در حال بروزرسانی می باشد')
  }

  getUserPermission(): void {
    this.userApi.getUserPermission().subscribe((res: any) => {
      if (res.isDone) {
        this.userPermissions = res.data;
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error();
      this.checkError.check(error);
    });

  }

  checkPermission(item: string) {
    return !!this.userPermissions.find(x => x.name.split('.')[0] === item)
  }

  checkItemPermission(item: string) {
    return !!this.userPermissions.find(x => x.name === item)
  }

  logOut(): void {
    this.isLoading = true
    this.api.logout().subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.removeUser();
        this.router.navigateByUrl('/prs-admin')

      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
      this.checkError.check(error);
    })
  }
}
