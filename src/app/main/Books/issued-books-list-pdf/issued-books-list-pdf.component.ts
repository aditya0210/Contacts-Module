import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { BooksListPdfService } from '../available-books-pdf/books-list-pdf.service';

@Component({
  selector: 'app-issued-books-list-pdf',
  templateUrl: './issued-books-list-pdf.component.html',
  styleUrls: ['./issued-books-list-pdf.component.scss']
})
export class IssuedBooksListPdfComponent implements OnInit {

  myDate = moment().format("YYYY-MM-DD")
  invoice: any[] = [];
  routeParams: any;
  className: string = '';
  sectionName: string = '';
  totalAmount: number = 0;
  logo = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _booksList: BooksListPdfService,
    private _fuseConfigService: FuseConfigService,
    private _route: ActivatedRoute
  ) {
    // Set the private defaults
    this._fuseConfigService.config = {
      layout: {
        footer: {
          hidden: true
        }
      }
    };
    this._unsubscribeAll = new Subject();
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    if (userDetails !== null) {
      this.logo = 'http://online-edu.in/media/' + userDetails.school_detail[0].fields.photo;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._booksList.getUnavaialableBooksList()
      .pipe()
      .subscribe(data => {
        this.invoice = data;
      })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
