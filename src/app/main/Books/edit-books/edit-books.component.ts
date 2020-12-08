import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { NewBooksService } from '../new-books/new-books.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditBooksComponent implements OnInit {

  editBook: FormGroup;
  routeParams: number;
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
    private route: ActivatedRoute,
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
    this.editBook = this._formBuilder.group({
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
    this.editBook.get('categoryName').valueChanges
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
    this.route.params.subscribe(data => {
      this.routeParams = data.id;
      this._newBookService.getBookDetails(data.id)
        .pipe()
        .subscribe(data => {
          this.editBook.patchValue({
            bookName: data.name,
            isbnNo: data.isbn_no,
            authorName: data.author_name,
            subCategoryName: data.book_sub_category_id.id,
            bookNumber: data.book_number,
            categoryName: data.book_category_id.id,
            publisherName: data.publisher_name
          })

        })
    })
  }

  onSubmit() {
    const formObject = {
      bookName: this.editBook.get('bookName').value,
      authorName: this.editBook.get('authorName').value,
      publisherName: this.editBook.get('publisherName').value,
      subCategoryName: this.editBook.get('subCategoryName').value,
      categoryName: this.editBook.get('categoryName').value,
    }
    this._newBookService.editBook(formObject, this.routeParams)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Book Detail Updated', {
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
