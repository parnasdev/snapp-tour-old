import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/Core/Https/auth-api.service';
import { UserApiService } from 'src/app/Core/Https/user-api.service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLoading = false;
  constructor(public session: SessionService,
    public userApi: UserApiService,
    public api: AuthApiService,
    public router: Router,
    public message: MessageService,
    public checkError: CheckErrorService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.isLoading = true
    this.api.logout().subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.removeUser();
        this.router.navigateByUrl('/')
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
      this.checkError.check(error);
    })
  }

  supportClicked(): void {
    this.message.custom('این گزینه در حال توسعه است')
  }
}
