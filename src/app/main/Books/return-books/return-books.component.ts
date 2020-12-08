import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { ReturnBooksService } from './return-books.service';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReturnBooksComponent implements OnInit, OnDestroy {

  returnBooks: FormGroup;
  patchId: any;
  options = [];
  minDate: Date;
  issuedBooksList: any[] = [];
  filteredOptions: Observable<any>;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _paymentService: ReturnBooksService,
    private toastr: ToastrService,
    private _fuseConfigService: FuseConfigService
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
    this.minDate = new Date(Date.now());
    // Reactive Form
    this.returnBooks = this._formBuilder.group({
      bookName: ['', Validators.required],
      studentId: ['', Validators.required],
      submissionDate: ['', Validators.required]
    })

    this.filteredOptions = this.returnBooks.get('studentId').valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter(value))
    )

    this.returnBooks.get('studentId').valueChanges
      .pipe()
      .subscribe(data => {
        this._paymentService.getIssuedBooksList(data.id)
          .pipe()
          .subscribe(booksList => {
            if (booksList.length == 0) {
              this.toastr.warning('', 'No Book Assined To The Student', {
                timeOut: 1500
              });
            }
            this.issuedBooksList = booksList;
          })

      })
  }

  displayFn(option): string {
    return option ? option.login_detail.first_name : option;
  }
  doFilter(value) {
    return this._paymentService.getdata()
      .pipe(
        map(response => response.filter(option => {
          return option.login_detail.first_name.toLowerCase().indexOf((value).toString().toLowerCase()) === 0
        }))
      )
  }

  onSubmit() {
    const formObject = this.returnBooks.getRawValue();
    this._paymentService.unIssueBooks(formObject, this.patchId)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Book Returned', {
          timeOut: 1500
        });
        this.router.navigate(['/library/available-books'])
      }, err => {
        this.toastr.error('Kindly Try Again', 'Something Went Wrong', {
          timeOut: 1500
        });
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
