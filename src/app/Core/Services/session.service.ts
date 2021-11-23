import {Injectable} from '@angular/core';
import {LoginResponseDTO, UserDTO} from "../Models/AuthDTO";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user = {} as LoginResponseDTO;
  outlineApi = false;

  constructor() {
  }

  setUserToSession(obj: LoginResponseDTO): void {
    this.user = {
      user: {
        id: obj.user.id,
        birthDay: obj.user.birthDay,
        family: obj.user.family,
        createdAt: obj.user.createdAt,
        name: obj.user.name,
        username: obj.user.username,
        phone: obj.user.phone,
        role: obj.user.role
      },
      token: obj.token
    }
    localStorage.setItem('prs-hmz-user', JSON.stringify(this.user));
  }

  getToken(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).token : '';
  }

  getId(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.id : '';
  }


  getName(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.name : '';
  }

  getPhone(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.phone : '';
  }

  getFamily(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.family : '';
  }

  getBirthday(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.birthDay : '';
  }
  getRole(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return user ? JSON.parse(user).user.role : '';
  }

  isLoggedIn(): any {
    const user = localStorage.getItem('prs-hmz-user');
    return !!user;
  }
  removeUser(): any {
    localStorage.removeItem('prs-hmz-user');
  }

  setOutlineApi(state: boolean): void {
    this.outlineApi = state;
  }
}
