import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot){
    const currentUser =  this.authService.currentUserValue;
        if (currentUser) {
          return true;
        }
        return this.router.navigate(['/library/auth/login']);
      }
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
  }
