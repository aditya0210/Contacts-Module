import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    otp: string;
    showField: boolean = false;
    showOtpComponent = true;
    @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
    forgotPasswordForm: FormGroup;
    config = {
        allowNumbersOnly: true,
        length: 4,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputStyles: {
            'width': '50px',
            'height': '50px'
        }
    };
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


    onOtpChange(otp) {
        this.otp = otp;
    }

    setVal(val) {
        this.ngOtpInput.setValue(val);
    }

    onConfigChange() {
        this.showOtpComponent = false;
        this.otp = null;
        setTimeout(() => {
            this.showOtpComponent = true;
        }, 0);
    }


    onSubmit() {
        this._authService.forgetPassword(this.forgotPasswordForm.get('email').value)
            .pipe()
            .subscribe(data => {
                this.showField = true;
                this.toastr.success('', 'OTP Sent Successfully', {
                    timeOut: 1500
                });

            }, error => {
                this.toastr.error('Kindly Try Again', 'Email Is Incorrect Or Not Registered', {
                    timeOut: 1500
                });
            })

    }

    onValidate() {
        this._authService.validateOTP(this.forgotPasswordForm.get('email').value, this.otp)
            .pipe()
            .subscribe(data => {
                const temp = JSON.parse(data.str);
                localStorage.setItem('token', (temp.data.token));
                this.toastr.success('', 'Validation SuccessFull', {
                    timeOut: 1500
                });
                this.router.navigate(['library/auth/reset-password']);

            }, error => {
                this.toastr.error('Kindly Try Again', 'OTP Is Incorrect', {
                    timeOut: 1500
                });
            })

    }
}
