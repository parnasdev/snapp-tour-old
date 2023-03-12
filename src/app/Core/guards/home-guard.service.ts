import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../Services/message.service';
import { SessionService } from '../Services/session.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  role = '';

  constructor(public session: SessionService,
    public message: MessageService,
    public router: Router) {
  }

  canActivate(): any {
    if ((window.location.hostname === environment.SITE_URL) || (window.location.hostname === environment.LOCAL_URL)) {
      return true
    } else {
      this.router.navigateByUrl('not-found')
    }

  }
}
