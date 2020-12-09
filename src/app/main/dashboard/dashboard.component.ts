import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
//import { DailogSessionSelectionComponent } from '../Profile/dailog-session-selection/dailog-session-selection.component';

//contact
//import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

//import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
//import { FuseConfigService } from '@fuse/services/config.service';
//import { AvailableBooksService } from './available-books.service';
//import { MatDialog } from '@angular/material';
//import { BookDialogDeleteComponent } from '../book-dialog-delete/book-dialog-delete.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent {

    // Private
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

    //dataSource: FilesDataSource | null;

    displayedColumns = ['Name', 'AccountName', 'Title', 'Phone', 'Email', 'OwnerName'];
  
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;
  
    @ViewChild('filter', { static: true })
    filter: ElementRef;
  
    @ViewChild(MatSort, { static: true })
    sort: MatSort;

    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {DashboardService} _analyticsDashboardService
     */
    constructor(
        private _dashboardService: DashboardService,
        public dialog: MatDialog,
        private _fuseConfigService: FuseConfigService,
// private _ecommerceOrdersService: AvailableBooksService,

       
    ) {
        this._fuseConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        //this.callAllonInitAPI();
        //this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
       // this.academicYear = JSON.parse(sessionStorage.getItem('academicYear'));
    }

    


   
      /**
       * Disconnect
       */
      disconnect(): void {
      }


   
   

   
}
