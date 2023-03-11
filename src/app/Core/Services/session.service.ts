import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AuthApiService } from "../Https/auth-api.service";
import { UserApiService } from '../Https/user-api.service';
import { LoginResponseDTO, ProfileDTO } from '../Models/AuthDTO';
import { PermissionDTO } from '../Models/UserDTO';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user = {} as LoginResponseDTO;
  outlineApi = false;
  userPermissions: PermissionDTO[] = [];

  checkUserSubject = new BehaviorSubject('');
  checkUser$ = this.checkUserSubject.asObservable();
  constructor(public authApi: AuthApiService,
    public message: MessageService,
    public userApi: UserApiService) {
  }

  setUserToSession(obj: LoginResponseDTO): void {
    this.user = {
      user: {
        birthDay: obj.user?.birthDay,
        family: obj.user?.family,
        city: obj.user?.city,
        email: obj.user?.email,
        gender: obj.user?.gender,
        agency: {
          name: obj.user.agency?.name,
          logo: obj.user.agency?.logo,
          isManager: obj.user.agency?.isManager,
          LicenseFileA: obj.user.agency?.LicenseFileA,
          id: obj.user.agency?.id,
          extra: obj.user.agency?.extra,
          LicenseFileB: obj.user.agency?.LicenseFileB,
          email: obj.user.agency?.email,
          address: obj.user.agency?.address,
          tell: obj.user.agency?.tell,
          site: obj.user.agency?.site,
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
    localStorage.setItem('snapp-tour-user', JSON.stringify(this.user));
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
    });

  }

  checkUser() {
    this.authApi.checkUser().subscribe((res: any) => {
      if (res.isDone) {
        this.setUserToSession({ token: this.getToken(), user: res.data });
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
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).token : '';
  }

  getId(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.id : '';
  }


  getName(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.name : '';
  }

  getUsername(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.username : '';
  }


  getPhone(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.phone : '';
  }

  getFamily(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.family : '';
  }
  getAgencyName(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.agency?.name : '';
  }

  getAgencyCommission(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? (JSON.parse(user).user.agency ? JSON.parse(user).user.agency?.commission : 0) : 0;
  }
  getAgencyIsManager(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? (JSON.parse(user).user.agency ? JSON.parse(user).user.agency?.isManager : false) : false;
  }

  getBirthday(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.birthDay : '';
  }
  getRole(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return user ? JSON.parse(user).user.role : '';
  }

  isLoggedIn(): any {
    const user = localStorage.getItem('snapp-tour-user');
    return !!user;
  }
  removeUser(): any {
    localStorage.removeItem('snapp-tour-user');
  }

  setOutlineApi(state: boolean): void {
    this.outlineApi = state;
  }
}
