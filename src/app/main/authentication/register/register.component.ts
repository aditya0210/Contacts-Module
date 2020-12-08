import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    selectedFlag = '+1';
    hide = true;
    hide1 = true;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private _formBuilder: FormBuilder
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            mobileNumber: ['', [Validators.required,  Validators.minLength(10),Validators.pattern('[6-9]\\d{9}')]],
        });
        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }


    onSubmit() {
        const formObject = {
            fname: this.registerForm.get('fname').value,
            lname: this.registerForm.get('lname').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
            countryCode: this.selectedFlag,
            mobileNumber: this.registerForm.get('mobileNumber').value,
        }
        this._authService.signup(formObject)
            .pipe()
            .subscribe(
                data => {
                    this.toastr.success('Login To Proceed', 'User Registered Successfully', {
                        timeOut: 1500
                    });
                    this.router.navigate(['/admin/auth/login']);
                },
                error => {
                    this.toastr.error('Kindly Try Again', 'User Already Registered Or Something Went Wrong', {
                        timeOut: 1500
                    });
                }
            )


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

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
