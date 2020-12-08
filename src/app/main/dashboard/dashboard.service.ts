import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    widgets: any[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getAttendanceDetails(id, d) {
        return this._httpClient.get<any>(environment.baseUrl + 'attendance/staffattendance/?date=' + d + '&staff_id=' + id);
    }

    getAvailableBooksNumber() {
        const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
        var school_id = userDetails['user_detail'][0].fields.school_id;
        return this._httpClient.get('https://online-edu.in/library/books/?available_status=1&school_id=' + school_id)
    }

    getUnavailableBooksNumber() {
        const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
        var school_id = userDetails['user_detail'][0].fields.school_id;
        return this._httpClient.get('https://online-edu.in/library/books/?available_status=0&school_id=' + school_id)
    }
}

