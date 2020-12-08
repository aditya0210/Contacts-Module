import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { FineListService } from '../fine-imposed-list/fine-list.service';

@Component({
  selector: 'app-fine-imposed-list-pdf',
  templateUrl: './fine-imposed-list-pdf.component.html',
  styleUrls: ['./fine-imposed-list-pdf.component.scss']
})
export class FineImposedListPdfComponent implements OnInit {

  myDate = moment().format("YYYY-MM-DD")
  invoice: any = [];
  bookData: any = []
  routeParams: any;
  className: string = '';
  sectionName: string = '';
  totalAmount: number = 0;
  logo = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _booksList: FineListService,
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
    this._route.params.subscribe(params => {
      this._booksList.getFineListRow(params['id'])
        .pipe()
        .subscribe(data => {
          this.invoice = data;
          this._booksList.getBookDetails(data.book_id)
            .pipe()
            .subscribe(data => {
              this.bookData = data;
              console.log("bookData", data);
            })
        })
    })
    // this._booksList.getAvaialableBooksList()
    //   .pipe()
    //   .subscribe(data => {
    //     this.invoice = data;
    //   })
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
