import { Injectable } from '@angular/core';
import {SessionService} from "../Services/session.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PanelGuardService implements CanActivate  {
  role;
  constructor(public session: SessionService, public router: Router) {
    this.role = session.getRole();
  }

  canActivate(): any {
    if (this.session.isLoggedIn() && (this.role === 'Admin' || this.role === 'Staff')) {
      return true;
    } else {
      this.router.navigate(['/prs-admin']);
    }
  }

}
