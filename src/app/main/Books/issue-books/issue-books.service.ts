import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueBooksService {

  constructor(private _httpClient: HttpClient) { }

  getIssueBooksList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this._httpClient.get<any>('https://online-edu.in/library/bookissued/?submitted=0&request_for_book=3&school_id=' + school_id)
  }
}
