import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FineListService {

  constructor(private _httpClient: HttpClient) { }

  getFineList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this._httpClient.get<any>('https://online-edu.in/library/lostbookrecovery/?school_id=' + school_id + '&term_id=' + termDetails.id)
  }

  getFineListRow(id) {
    return this._httpClient.get<any>('https://online-edu.in/library/lostbookrecovery/' + id + '/')
  }

  getBookDetails(id){
    return this._httpClient.get<any>('https://online-edu.in/library/books/' + id + '/')
  }
}
