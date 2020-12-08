import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       if (!user) {
  //         return next.handle(req);
  //       }
  //       const modifiedReq = req.clone({
  //         params: new HttpParams().set('auth', user.token)
  //       });
  //       return next.handle(modifiedReq);
  //     })
  //   );
  // }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;
    const token = (sessionStorage.getItem('applicationToken'));
    if (currentUser) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Token ${token}`
            }
        });
    }

    return next.handle(request);
}
}
