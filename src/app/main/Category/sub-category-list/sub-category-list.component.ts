import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../sub-category/sub-category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'book_category_name', 'created_at'];

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
    private _topicsDetails: SubCategoryService,
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
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this._topicsDetails.getSubCategoryList()
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
