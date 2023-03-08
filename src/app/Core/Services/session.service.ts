import {Injectable} from '@angular/core';
import {LoginResponseDTO} from "../Models/authDTO";
import {BehaviorSubject} from "rxjs";
import {AuthApiService} from "../Https/auth-api.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user = {} as LoginResponseDTO;
  outlineApi = false;

  checkUserSubject = new BehaviorSubject('');
  checkUser$ = this.checkUserSubject.asObservable();
  constructor(public authApi: AuthApiService) {
  }

  setUserToSession(obj: LoginResponseDTO): void {
    this.user = {
      user: {
        birthDay: obj.user?.birthDay,
        family: obj.user?.family,
        agency: {
          name: obj.user.agency?.name,
          logo: obj.user.agency?.logo,
          commission: obj.user.agency?.commission,
          isManager: obj.user.agency?.isManager,
          LicenseFileA: obj.user.agency?.LicenseFileA,
          id: obj.user.agency?.id,
          LicenseFileB: obj.user.agency?.LicenseFileB,
          email: obj.user.agency?.email,
          address: obj.user.agency?.address,
          tell: obj.user.agency?.tell,
          site: obj.user.agency?.site,
          crewCount: obj.user.agency?.crewCount,
          necessaryPhone: obj.user.agency?.necessaryPhone
        },
        createdAt: obj.user.createdAt,
        name: obj.user?.name,
        username: obj.user?.username,
        phone: obj.user?.phone,
        role: obj.user?.role
      },
      token: obj.token
    }
    localStorage.setItem('prs-bkg-user', JSON.stringify(this.user));
  }

  checkUser() {
    this.authApi.checkUser().subscribe((res: any) => {
      if (res.isDone) {
        this.setUserToSession({token: this.getToken(), user: res.data});
        this.checkUserSubject.next('true');
      } else {
        // this.message.error();
        if (res.status === 401) {
          this.removeUser();
        }
      }
    }, (error: any) => {
      // this.errorService.check(error)
      if (error.status === 401) {
        this.removeUser();
      }
    });
  }

  getToken(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).token : '';
  }

  getId(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.id : '';
  }


  getName(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.name : '';
  }

  getPhone(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.phone : '';
  }

  getFamily(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.family : '';
  }
  getAgencyName(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.agency?.name : '';
  }

  getAgencyCommission(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? (JSON.parse(user).user.agency ? JSON.parse(user).user.agency?.commission: 0) : 0;
  }
  getAgencyIsManager(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? (JSON.parse(user).user.agency ? JSON.parse(user).user.agency?.isManager: false) : false;
  }

  getBirthday(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.birthDay : '';
  }
  getRole(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return user ? JSON.parse(user).user.role : '';
  }

  isLoggedIn(): any {
    const user = localStorage.getItem('prs-bkg-user');
    return !!user;
  }
  removeUser(): any {
    localStorage.removeItem('prs-bkg-user');
  }

  setOutlineApi(state: boolean): void {
    this.outlineApi = state;
  }
}
