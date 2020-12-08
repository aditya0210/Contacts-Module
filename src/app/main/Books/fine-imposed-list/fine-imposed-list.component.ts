import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatTableDataSource } from '@angular/material';
import { FineListService } from './fine-list.service';

@Component({
  selector: 'app-fine-imposed-list',
  templateUrl: './fine-imposed-list.component.html',
  styleUrls: ['./fine-imposed-list.component.scss'],
  animations: fuseAnimations
})
export class FineImposedListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['student_name', 'book_name', 'amount', 'is_paid', 'created_at', 'action', 'receipt'];

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
   * @param {PayTypeDetailService} _ecommerceOrdersService
   */
  constructor(
    private _fineList: FineListService,
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
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._fineList.getFineList()
      .pipe()
      .subscribe(data => {
        this.dataSource.data = data;
      })

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

  /**
   * On destroy
   */

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }



}
