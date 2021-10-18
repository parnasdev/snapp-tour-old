import {HTTP_INTERCEPTORS, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {SessionService} from '../Services/session.service';

const TOKEN_HEADER_KEY = 'Authorization';
const GUEST_HEADER_KEY = 'guest-key';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private session: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        let token = this.session.getToken();

        let headers = new HttpHeaders();
      token = 'Bearer ' + token;
      headers = new HttpHeaders(
        {
          'app-key': 'AdVNS4mEeLSyIHy640hNHVDsrAOvKmsJ',
          Authorization: token
        });
        let authReq = req.clone({headers});
        return next.handle(authReq);
 }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
