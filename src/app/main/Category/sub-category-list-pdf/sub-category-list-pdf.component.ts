import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { SubCategoryService } from '../sub-category/sub-category.service';

@Component({
  selector: 'app-sub-category-list-pdf',
  templateUrl: './sub-category-list-pdf.component.html',
  styleUrls: ['./sub-category-list-pdf.component.scss']
})
export class SubCategoryListPdfComponent implements OnInit {

  myDate = moment().format("YYYY-MM-DD")
  invoice: any[] = [];
  totalAmount: number = 0;
  logo = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _invoiceService: SubCategoryService,
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
    this._invoiceService.getSubCategoryList()
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
