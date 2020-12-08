import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ReturnBooksService {

  opts = [];
  opts1 = [];
  constructor(private _httpClient: HttpClient) { }

  getdata() {
    return this.opts.length ?
      of(this.opts) :
      this._httpClient.get<any>('https://online-edu.in/students/api/student/').pipe(tap(data => this.opts = data))
  }

  getBookData() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this._httpClient.get<any>('https://online-edu.in/library/books/?available_status=1&school_id=' + school_id)
    // return this.opts1.length ?
    //   of(this.opts1) :
    //   this._httpClient.get<any>('https://online-edu.in/library/books/?available_status=1&school_id=' + school_id).pipe(tap(data => this.opts1 = data))
  }

  issueBooks(formObject) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this._httpClient.post<any>(`https://online-edu.in/library/bookissued/`,
      {
        "issued_date": moment(formObject.issueDate).format("YYYY-MM-DD"),
        "due_date": moment(formObject.dueDate).format("YYYY-MM-DD"),
        "submission_date": null,
        "submitted": "0",
        "request_for_book": "3",
        "comment": formObject.comment,
        "book_id": formObject.bookName.id,
        "student_id": formObject.studentId.id,
        "school_id": school_id,
        "term_id": termDetails.id
      }
    )
  }

  getIssuedBooksList(id) {
    return this._httpClient.get<any>(`https://online-edu.in/library/bookissued/?student_id=` + id + `&submitted=0&request_for_book=3`)
  }

  unIssueBooks(formObject, patchId) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this._httpClient.patch<any>(`https://online-edu.in/library/bookissued/` + formObject.bookName + `/`,
      {
        "submission_date": moment(formObject.submissionDate).format("YYYY-MM-DD"),
        "submitted": "1",
        "request_for_book": "3",
        "student_id": formObject.studentId.id,
        "school_id": school_id
      }
    )
  }
}
