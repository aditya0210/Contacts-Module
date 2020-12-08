import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewBooksService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(`https://online-edu.in/library/bookcategory/?school_id=` + school_id)
  }

  getSubCategoryList(id) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(`https://online-edu.in/library/booksubcategory/?school_id=` + school_id + `&book_category_id=` + id)
  }

  addNewBook(formObject) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.post<any>(`https://online-edu.in/library/books/`,
      {
        "name": formObject.bookName,
        "book_number": formObject.bookNumber,
        "available_status": 1,
        "author_name": formObject.authorName,
        "isbn_no": formObject.isbnNo,
        "publisher_name": formObject.publisherName,
        "school_id": school_id,
        "book_category_id": formObject.categoryName,
        "book_sub_category_id": formObject.subCategoryName,
        "term_id": termDetails.id
      }
    )
  }

  getBookDetails(id) {
    return this.http.get<any>(`https://online-edu.in/library/books/` + id + `/`)
  }

  editBook(formObject, id) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.patch<any>(`https://online-edu.in/library/books/` + id + `/`,
      {
        "name": formObject.bookName,
        "author_name": formObject.authorName,
        "publisher_name": formObject.publisherName,
        "school_id": school_id,
        "book_category_id": formObject.categoryName,
        "book_sub_category_id": formObject.subCategoryName
      }
    )
  }
}
