import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { AddFineService } from '../add-fine/add-fine.service';

@Component({
  selector: 'app-edit-fine-list',
  templateUrl: './edit-fine-list.component.html',
  styleUrls: ['./edit-fine-list.component.scss'],
  //   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditFineListComponent implements OnInit {

  returnBooks: FormGroup;
  routeParams: number;
  studentName: any;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _returnService: AddFineService,
    private route: ActivatedRoute,
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
    this.returnBooks = this._formBuilder.group({
      bookName: ['', Validators.required],
      studentId: ['', Validators.required],
      amount: ['', Validators.required],
      payment: ['', Validators.required]
    })

    this.route.params.subscribe(data => {
      this.routeParams = data.id;
      this._returnService.getFineDetails(data.id)
        .pipe()
        .subscribe(data => {
          this.studentName = data.student_name
          this.returnBooks.patchValue({
            bookName: data.book_id,
            amount: data.amount,
            payment: data.is_paid
          })

        })
    })

  }


  onSubmit() {
    const formObject = this.returnBooks.getRawValue();
    this._returnService.editFine(formObject, this.routeParams)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Fine Updated', {
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
