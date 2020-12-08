import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksListPdfService {

  constructor(private http: HttpClient) { }

  getAvaialableBooksList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(`https://online-edu.in/library/books/?available_status=1&school_id=` + school_id)
  }

  getBookListStudentWise(id) {
    // return this.http.get<any>(`https://online-edu.in/library/bookissued/?student_id=` + id + `&request_for_book=3`)
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.get<any>(`https://online-edu.in/library/bookissued/?student_id=` + id + '&term_id=' + termDetails.id)
  }

  getUnavaialableBooksList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>('https://online-edu.in/library/bookissued/?submitted=0&request_for_book=3&school_id=' + school_id)
  }

  deleteBook(id) {
    return this.http.delete<any>(`https://online-edu.in/library/books/` + id + `/`)
  }
}
