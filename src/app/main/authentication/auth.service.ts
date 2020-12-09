import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from './user.model';
import { environment } from 'environments/environment';
export interface AuthResponseData {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public selectedLanguageSubject = new BehaviorSubject<string>('en-GB');
  public selectedLanguage = this.selectedLanguageSubject.asObservable()
  public currentUserSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<boolean>;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<boolean>(this.getBooleanValue());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): boolean {
    return this.currentUserSubject.value;
  }

  getBooleanValue() {
    return !!JSON.parse(sessionStorage.getItem('currentUser'))
  }
  signup(formObject: any) {
    return this.http.post<any>(`https://otelna.bidash.ml/suppliers/v1/register`,
      {
        str: {
          "suppliers_first_name": formObject.fname,
          "suppliers_last_name": formObject.lname,
          "email": formObject.email,
          "password": formObject.password,
          "country_code": formObject.countryCode,
          "mobile": formObject.mobileNumber,
          "fcmToken": localStorage.getItem('fcmToken')
        }
      }
    )
  }

  // login(email: string, password: string) {
  //   var fcmToken = sessionStorage.getItem('fcmToken');
  //   if (fcmToken == null) {
  //     fcmToken = 'aditya'
  //   }
  //   return this.http.post<any>(environment.baseUrl + 'rest-auth/login/',
  //     {
  //       email: email,
  //       password: password,
  //       group_id: 12
  //     })
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes

  //         // sessionStorage.setItem('supplierId', userData.data.id);
  //         sessionStorage.setItem('applicationToken', user.key);
  //         sessionStorage.setItem('currentUser', JSON.stringify(user));
  //         sessionStorage.setItem('profileImg', environment.baseUrl + 'media/' + user.user_detail[0].fields.photo);
  //         sessionStorage.setItem('currentUserName', user.user.first_name);
  //         this.currentUserSubject.next(true);

  //       }

  //       return user;
  //     }));
  // }

  login(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'auth/login/', data).pipe(map(res => {
      localStorage.setItem('userDetails', JSON.stringify(res));
      localStorage.setItem('token', res.key);
      if (res.user.is_superuser) {
        localStorage.setItem('role', 'Admin');
      }
      else {
        localStorage.setItem('role', 'User');
      }
      return res;
    }));
  }
  

  logout() {
    // remove user from local storage to log user out
    this.toastr.success('Successfully', 'LoggedOut', {
      timeOut: 1500
    });
    // sessionStorage.removeItem('supplierId');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUserName');
    sessionStorage.removeItem('profileImg');
    sessionStorage.removeItem('applicationToken');
    this.currentUserSubject.next(false);
  }

  setLanguage(language: string) {
    this.selectedLanguageSubject.next(language);
  }

  forgetPassword(email: string) {
    return this.http.post<any>(`https://otelna.bidash.ml/suppliers/v1/generate_otp_by_email`,
      {
        str: {

          "email": email,

        }
      }
    )
  }

  validateOTP(email: string, otp: string) {
    const otpNumber = parseInt(otp);
    return this.http.post<any>(`https://otelna.bidash.ml/suppliers/v1/verify_otp_by_email`,
      {
        str: {
          "email": email,
          "otp": otpNumber
        }
      }
    )
  }

  changePassword(password: string, token: string) {
    return this.http.post<any>(`https://otelna.bidash.ml/suppliers/v1/forgot_password`,
      {
        str: {
          "new_password": password,
          "token": token
        }
      }
    )
  }
  // tslint:disable-next-line:typedef
  autoLogin() {
    const userData: {
      _accessToken: string;
      _refreshToken: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      // userData._accessToken,
      // userData._refreshToken
    );

    // if (loadedUser.token) {
    //   this.user.next(loadedUser);
    // }
  }

  // logout() {
  //   this.user.next(null);
  //   this.router.navigate(['/auth/login']);
  //   localStorage.removeItem('userData');
  //   // if (this.tokenExpirationTimer) {
  //   //   clearTimeout(this.tokenExpirationTimer);
  //   // }
  // //  this.tokenExpirationTimer = null;
  // }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    accessToken: string,
    refreshToken: string
  ) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // const user = new User(accessToken, refreshToken);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      // case 'EMAIL_EXISTS':
      //   errorMessage = 'This email exists already';
      //   break;
      // case 'EMAIL_NOT_FOUND':
      //   errorMessage = 'This email does not exist.';
      //   break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
