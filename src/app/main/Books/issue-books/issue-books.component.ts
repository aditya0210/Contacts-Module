import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatTableDataSource } from '@angular/material/table';
import { IssueBooksService } from './issue-books.service';

@Component({
  selector: 'app-issue-books',
  templateUrl: './issue-books.component.html',
  styleUrls: ['./issue-books.component.scss'],
  animations: fuseAnimations
})
export class IssueBooksComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'book_number', 'author_name', 'student_name', 'issued_date', 'due_date', 'remaining_days'];

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
    private _trialBalance: IssueBooksService,
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
    this._trialBalance.getIssueBooksList()
      .pipe()
      .subscribe(data => {
        this.dataSource.data = data.map(ele => ({
          book_name: ele.book_name,
          book_number: ele.book_number,
          author_name: ele.author_name,
          student_name: ele.student_name,
          issued_date: ele.issued_date,
          due_date: ele.due_date,
          remaining_days: this.calculateDifference(ele.due_date),
        }))

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

  calculateDifference(date) {
    var currentDate = new Date(Date.now());
    var tempDate = new Date(date);
    var Difference_In_Time = currentDate.getTime() - tempDate.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    if (Difference_In_Days > 0)
      return Difference_In_Days;
    else
      return 0;
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
