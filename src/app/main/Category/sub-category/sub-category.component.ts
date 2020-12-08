import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { SubCategoryService } from './sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SubCategoryComponent implements OnInit {

  addSubCategory: FormGroup;
  categoryList: any[] = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _subCategory: SubCategoryService,
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
    this.addSubCategory = this._formBuilder.group({
      subCategoryName: ['', Validators.required],
      categoryName: ['', Validators.required]
    })
    this._subCategory.getCategoryList()
      .pipe()
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          this.categoryList.push(data[i]);
        }
      })
  }

  onSubmit() {
    const formObject = this.addSubCategory.getRawValue();
    this._subCategory.addSubCategory(formObject)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Sub-Category Added', {
          timeOut: 1500
        });
        this.router.navigate(['/library/dashboard'])
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
