import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddFineService {

  opts = [];
  opts1 = [];
  constructor(private _httpClient: HttpClient) { }

  getdata() {
    return this.opts.length ?
      of(this.opts) :
      this._httpClient.get<any>('https://online-edu.in/students/api/student/').pipe(tap(data => this.opts = data))
  }

  addFine(formObject) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this._httpClient.post<any>(`https://online-edu.in/library/lostbookrecovery/`,
      {
        "amount": formObject.amount,
        "is_paid": formObject.payment,
        "book_id": formObject.bookName,
        "student_id": formObject.studentId.id,
        "school_id": school_id,
        "term_id": termDetails.id
      }
    )
  }

  getFineDetails(id) {
    return this._httpClient.get<any>(`https://online-edu.in/library/lostbookrecovery/` + id + `/`)
  }

  editFine(formObject, id) {
    return this._httpClient.patch<any>(`https://online-edu.in/library/lostbookrecovery/` + id + `/`,
      {
        "amount": formObject.amount,
        "is_paid": formObject.payment,
      }
    )
  }
}
