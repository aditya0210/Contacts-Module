import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksListPdfService } from '../available-books-pdf/books-list-pdf.service';

@Component({
  selector: 'app-books-list-student-wise',
  templateUrl: './books-list-student-wise.component.html',
  styleUrls: ['./books-list-student-wise.component.scss'],
  animations: fuseAnimations,
})
export class BooksListStudentWiseComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  routeParams: any;
  displayedColumns: string[] = ['book_name', 'issued_date', 'due_date', 'submission_date'];

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
    private _topicsDetails: BooksListPdfService,
    private _route: ActivatedRoute,
    private _router: Router,
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
    this._route.params.subscribe(params => {
      this.routeParams = params['id'];
      this._topicsDetails.getBookListStudentWise(params['id'])
        .pipe()
        .subscribe(data => {
          this.dataSource.data = data;
        })
    });
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

  pdfNavigate() {
    this._router.navigate(['/library/assigned-book-List-Pdf', { id: this.routeParams }])
  }

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
