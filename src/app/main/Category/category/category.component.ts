import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fuseAnimations } from '@fuse/animations';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
//   encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CategoryComponent implements OnInit {

  addCategory: FormGroup;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _categoryService: CategoryService,
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
    this.addCategory = this._formBuilder.group({
      categoryName: ['', Validators.required]
    })

  }

  onSubmit() {
    const formObject = this.addCategory.getRawValue();
    this._categoryService.addCategory(formObject)
      .pipe()
      .subscribe(data => {
        this.router.navigate(['/library/dashboard']);
        this.toastr.success('Successfully', 'Category Added', {
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
