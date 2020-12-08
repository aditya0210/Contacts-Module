import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { NewBooksService } from './new-books.service';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewBooksComponent implements OnInit {

  addNewBooks: FormGroup;
  categoryList: any[] = [];
  subCategoryList: any[] = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _newBookService: NewBooksService,
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
    // Reactive Form
    this.addNewBooks = this._formBuilder.group({
      bookName: ['', Validators.required],
      isbnNo: ['', Validators.required],
      authorName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      bookNumber: ['', Validators.required],
      categoryName: ['', Validators.required],
      publisherName: ['', Validators.required],

    })
    this._newBookService.getCategoryList()
      .pipe()
      .subscribe(data => {
        this.categoryList = data;
        // for (var i = 0; i < data.length; i++) {
        //   this.categoryList.push(data[i]);
        // }
      })
    this.addNewBooks.get('categoryName').valueChanges
      .subscribe(id => {
        this._newBookService.getSubCategoryList(id)
          .pipe()
          .subscribe(data => {
            this.subCategoryList = data
            // for (var i = 0; i < data.length; i++) {
            //   this.subCategoryList.push(data[i]);
            // }
          })
      })

  }

  onSubmit() {
    const formObject = this.addNewBooks.getRawValue();
    this._newBookService.addNewBook(formObject)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Book Added', {
          timeOut: 1500
        });
        this.router.navigate(['/library/available-books'])
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
