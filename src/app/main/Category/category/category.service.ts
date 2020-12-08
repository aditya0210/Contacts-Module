import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(formObject) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var school_id = userDetails['user_detail'][0].fields.school_id;
    var termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    return this.http.post<any>(`https://online-edu.in/library/bookcategory/`, {
      "name": formObject.categoryName,
      "school_id": school_id,
      "term_id": termDetails.id,
    }
    )
  }
}

