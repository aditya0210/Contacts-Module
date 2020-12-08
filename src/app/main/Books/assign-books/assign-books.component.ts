import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { ReturnBooksService } from '../return-books/return-books.service';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-assign-books',
  templateUrl: './assign-books.component.html',
  styleUrls: ['./assign-books.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssignBooksComponent implements OnInit {

  returnBooks: FormGroup;
  minDate: Date;
  options = [];
  filteredOptions: Observable<any>;
  options1 = [];
  filteredOptions1: Observable<any>;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _returnService: ReturnBooksService,
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
    this._returnService.getBookData().
      pipe().subscribe(data => {

      })
    // Reactive Form
    this.returnBooks = this._formBuilder.group({
      bookName: ['', Validators.required],
      studentId: ['', Validators.required],
      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      comment: ['']
    })

    this.filteredOptions = this.returnBooks.get('studentId').valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter(value))
    )

    this.filteredOptions1 = this.returnBooks.get('bookName').valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter1(value))
    )

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


  displayFn1(option): string {
    return option ? option.name : option;
  }
  doFilter1(value) {
    return this._returnService.getBookData()
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf((value).toString().toLowerCase()) === 0
        }))
      )
  }



  onSubmit() {
    const formObject = this.returnBooks.getRawValue();
    this._returnService.issueBooks(formObject)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Book Assigned', {
          timeOut: 1500
        });
        this.router.navigate(['/library/issue-books'])
      }, err => {
        this.toastr.error('Kindly Try Again', 'Something Went Wrong', {
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
