import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  termDetails: any;
  staff_id: any;
  schoolID: any;
  constructor(private http: HttpClient) { }

  // getTermDetails(): void {
  //   const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
  //   this.staff_id = userDetails['user_detail'][0].pk;
  //   this.schoolID = userDetails['user_detail'][0].fields.school_id;
  //   this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
  // }

  getAttendanceDetails(date, staffid) {
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var schoolID = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'attendance/staffattendance/?date=' + date + '&staff_id=' + staffid + '&school_id=' + schoolID + '&term_id=' + termDetails.id);
  }

  leaveApply(data) {
    return this.http.post<any>(environment.baseUrl + '/attendance/staffleaves/', data);
  }

  leaveStatus(staffId) {
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.get<any>(environment.baseUrl + 'attendance/staffleaves/?staff_id=' + staffId + '&term_id=' + termDetails.id);
  }

  leaveTypes() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var schoolID = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(environment.baseUrl + 'attendance/leavetype/?school_id=' + schoolID);
  }
}
