import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { FineListService } from '../fine-imposed-list/fine-list.service';

@Component({
  selector: 'app-fine-list-pdf',
  templateUrl: './fine-list-pdf.component.html',
  styleUrls: ['./fine-list-pdf.component.scss']
})
export class FineListPdfComponent implements OnInit {

  myDate = moment().format("YYYY-MM-DD")
  invoice: any[] = [];
  logo = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _booksList: FineListService,
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
    this._booksList.getFineList()
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
