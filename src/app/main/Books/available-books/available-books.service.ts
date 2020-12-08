import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableBooksService {

  orders: any[];
  onOrdersChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient
  ) {
    // Set the defaults
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
        this.getOrders()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
   * Get orders
   *
   * @returns {Promise<any>}
   */
  getOrders(): Promise<any> {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return new Promise((resolve, reject) => {
      this._httpClient.get('https://online-edu.in/library/books/?available_status=1&school_id=' + school_id)
        .subscribe((response: any) => {
          this.orders = response;
          this.onOrdersChanged.next(this.orders);
          resolve(response);
        }, reject);
    });
  }
}
