import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    return this.http.get<any>(`https://online-edu.in/library/bookcategory/?school_id=` + school_id + '&term_id=' + termDetails.id)
  }

  addSubCategory(formObject) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.post<any>(`https://online-edu.in/library/booksubcategory/`, {
      "name": formObject.subCategoryName,
      "book_category_id": formObject.categoryName,
      "school_id": school_id,
      "term_id": termDetails.id,
    }
    )
  }

  getSubCategoryList() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.get<any>(`https://online-edu.in/library/booksubcategory/?school_id=` + school_id + '&term_id=' + termDetails.id)
  }

}
