import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    hide = true;
    submitted = false;
    loadingSpinner = false;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private authService: AuthService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
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
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    get loginFormControls() {
        return this.loginForm.controls;
      }

    onSubmit(){
    this.loadingSpinner = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loadingSpinner = false;
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.loadingSpinner = false;
      console.log(res);
      this.toastr.success('Successfully', 'Log in', {
        timeOut: 1500
      });

      this.router.navigate(['/dashboard']);

      // if (res.user.is_superuser) {
      //   this.router.navigate(['/admin']);
      // } else {
      //   this.router.navigate(['/landing']);
      // }

    }, error => {
      console.log("error", error);
      this.loadingSpinner = false;
      this.toastr.error('', error.error.non_field_errors[0], {
        timeOut: 1500
      });
    });
  }

}
