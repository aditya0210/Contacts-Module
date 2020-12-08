import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { AddFineService } from './add-fine.service';
import { ReturnBooksService } from '../return-books/return-books.service';

@Component({
  selector: 'app-add-fine',
  templateUrl: './add-fine.component.html',
  styleUrls: ['./add-fine.component.scss'],
  //   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddFineComponent implements OnInit {

  returnBooks: FormGroup;
  minDate: Date;
  options = [];
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
    private _returnService: AddFineService,
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
      amount: ['', Validators.required],
      payment: ['', Validators.required]
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
    return this._returnService.getdata()
      .pipe(
        map(response => response.filter(option => {
          return option.login_detail.first_name.toLowerCase().indexOf((value).toString().toLowerCase()) === 0
        }))
      )
  }



  onSubmit() {
    const formObject = this.returnBooks.getRawValue();
    this._returnService.addFine(formObject)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Fine Added', {
          timeOut: 1500
        });
        this.router.navigate(['/library/imposed-fine-list'])
      }, err => {
        this.toastr.error('Please Try Again', 'Something Went Wrong', {
          timeOut: 1500
        });
      })

  }

  routerNavigation() {

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
