import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../Services/message.service';
import { SessionService } from '../Services/session.service';

@Injectable({
  providedIn: 'root'
})
export class PanelItemGuardService implements CanActivate {
  role = '';
  constructor(public session: SessionService,
    public message: MessageService,
    public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let permition = route.data?.permitions as Array<string>;
    if (this.checkPermission(permition[0])) {
      return true;
    } else {
      this.message.custom('شما به این مسیر دسترسی ندارید')
      this.router.navigateByUrl('/panel');

      return false
    }
  }

  checkPermission(item: string) {
    return !!this.session.userPermissions.find(x => x.name.split('.')[0] === item)
  }
}
