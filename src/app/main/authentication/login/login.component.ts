import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DailogSessionSelectionComponent } from 'app/main/Profile/dailog-session-selection/dailog-session-selection.component';
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
        private router: Router
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
            password: ['', [Validators.required, Validators.minLength(8)]],
        });

    }

    // tslint:disable-next-line:typedef
    onSubmit() {
        this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                resData => {
                    this.toastr.success('Successfully', 'LoggedIn', {
                        timeOut: 1500
                    });
                    const dialogRef = this.dialog.open(DailogSessionSelectionComponent, {
                        width: '500px',
                        disableClose: true,
                        backdropClass: 'backdropBackground'
                    });
                },
                errorMessage => {
                    this.toastr.error('Try Again', 'Email Or Password Incorrect', {
                        timeOut: 1500
                    });
                });
    }
}
