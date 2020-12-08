import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  termDetails: any;
  staff_id: any;
  schoolID: any;

  constructor(private http: HttpClient) { }

  raiseRequest(data): Observable<any> {
    return this.http.post(environment.baseUrl + 'hr/api/requestfromuser/', data);
  }

  changePassWord(email, formObject) {
    return this.http.post<any>(`https://online-edu.in/users/password/update-password/`,
      {
        "email": email,
        "password": formObject.password,
        "old_password": formObject.oldPassword,
        "confirm_password": formObject.passwordConfirm
      })
  }

  uploadProfile(data, id) {
    return this.http.patch<any>(environment.baseUrl + 'users/api/staff/' + id + '/', data);
  }

  getRaiseRequest(id) {
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'hr/api/requestfromuser/?staff_id=' + id + '&school_id=' + school_id + '&term_id=' + termDetails.id)
  }

  getInventoryRequrstDetails(staffID) {
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.get<any>(environment.baseUrl + 'users/api/user_request_for_inventory/?staff_id=' + staffID + '&term_id=' + termDetails.id)
  }

  getInventoryTypes() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'accounts/InventoryRequest/?school_id=' + school_id);
  }

  inventoryRaiseRequest(staffId, data) {
    return this.http.post<any>(environment.baseUrl + 'users/api/staffinventoryrequest/' + staffId + '/', data);
  }

  getTermdetails(yearid) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'curriculum/api/yearwiseterms/?school_id=' + school_id + '&academic_year_id=' + yearid);
  }

  getAcademicYear() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'curriculum/api/academicyearduration/?school_id=' + school_id);
  }
}
