import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksListPdfService } from '../available-books-pdf/books-list-pdf.service';

@Component({
  selector: 'app-book-dialog-delete',
  templateUrl: './book-dialog-delete.component.html',
  styleUrls: ['./book-dialog-delete.component.scss']
})
export class BookDialogDeleteComponent implements OnInit {

  deleteBookId: number;
  constructor(private _bookAction: BooksListPdfService, private _router: Router,
    private toastr: ToastrService, public dialogRef: MatDialogRef<BookDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) {
    this.deleteBookId = data;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this._bookAction.deleteBook(this.deleteBookId)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Book Deleted', {
          timeOut: 1500
        });
        this.dialogRef.close();
        this._router.navigate(['/library/dashboard'])
      }, err => {
        this.toastr.error('Try Again', 'Something went wrong', {
          timeOut: 1500
        });
        this.dialogRef.close();
      })
  }
}
