import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  orders: any[];
  onOrdersChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onOrdersChanged = new BehaviorSubject({});
  }

  /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getStudentsList()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
     * Get TeachersList
     *
     * @returns {Promise<any>}
     */
  getStudentsList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://online-edu.in/students/api/student/')
        .subscribe((response: any) => {
          this.orders = response;
          this.onOrdersChanged.next(this.orders);
          resolve(response);
        }, reject);
    });
  }
}
