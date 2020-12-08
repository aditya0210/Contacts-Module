import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { AvailableBooksService } from './available-books.service';
import { MatDialog } from '@angular/material';
import { BookDialogDeleteComponent } from '../book-dialog-delete/book-dialog-delete.component';

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.scss'],
  animations: fuseAnimations
})
export class AvailableBooksComponent implements OnInit {

  dataSource: FilesDataSource | null;
  displayedColumns = ['name', 'bookNumber', 'isbnNo', 'authorName', 'publisherName', 'bookCategory', 'booksubCategory', 'delete'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild('filter', { static: true })
  filter: ElementRef;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AvailableBooksService} _ecommerceOrdersService
   */
  constructor(
    private _ecommerceOrdersService: AvailableBooksService,
    private _fuseConfigService: FuseConfigService,
    public dialog: MatDialog,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
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
    this.dataSource = new FilesDataSource(this._ecommerceOrdersService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }


  deleteBook(id) {
    const dialogRef = this.dialog.open(BookDialogDeleteComponent, {
      width: '450px',
      data: id
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

export class FilesDataSource extends DataSource<any>
{
  // Private
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {AvailableBooksService} _ecommerceOrdersService
   * @param {MatPaginator} _matPaginator
   * @param {MatSort} _matSort
   */
  constructor(
    private _ecommerceOrdersService: AvailableBooksService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this._ecommerceOrdersService.orders;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._ecommerceOrdersService.onOrdersChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    return merge(...displayDataChanges).pipe(map(() => {

      let data = this._ecommerceOrdersService.orders.slice();

      data = this.filterData(data);

      this.filteredData = [...data];

      data = this.sortData(data);

      // Grab the page's slice of data.
      const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
      return data.splice(startIndex, this._matPaginator.pageSize);
    })
    );

  }

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._matSort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'bookNumber':
          [propertyA, propertyB] = [a.bookNumber, b.bookNumber];
          break;
        case 'bookCategory':
          [propertyA, propertyB] = [a.bookCategory, b.bookCategory];
          break;
        case 'booksubCategory':
          [propertyA, propertyB] = [a.booksubCategory, b.booksubCategory];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}
