import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { BooksListPdfService } from '../available-books-pdf/books-list-pdf.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list-student-wise-pdf',
  templateUrl: './book-list-student-wise-pdf.component.html',
  styleUrls: ['./book-list-student-wise-pdf.component.scss']
})
export class BookListStudentWisePdfComponent implements OnInit {

  myDate = moment().format("YYYY-MM-DD")
  invoice: any[] = [];
  totalAmount: number = 0;
  logo = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _invoiceService: BooksListPdfService,
    private _route: ActivatedRoute,
    private _fuseConfigService: FuseConfigService
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
    this._route.params.subscribe(params => {
      this._invoiceService.getBookListStudentWise(params['id'])
        .pipe()
        .subscribe(data => {
          this.invoice = data;
        })
    });
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
