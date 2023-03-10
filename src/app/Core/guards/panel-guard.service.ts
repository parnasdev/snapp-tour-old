import { Injectable } from '@angular/core';
import {SessionService} from "../Services/session.service";
import {CanActivate, Router} from "@angular/router";
import { MessageService } from '../Services/message.service';

@Injectable({
  providedIn: 'root'
})
export class PanelGuardService implements CanActivate  {
  role = '';
  constructor(public session: SessionService,
    public message: MessageService,
    public router: Router) {

  }

  canActivate(): any {
    this.role = this.session.getRole();
    if (this.session.isLoggedIn() && (this.role === 'Admin' || this.role === 'Staff' || this.role === 'Agency')) {
      return true;
    } else {
      this.message.custom('شما به این مسیر دسترسی ندارید')
      this.router.navigateByUrl('/');
    }
  }

}
