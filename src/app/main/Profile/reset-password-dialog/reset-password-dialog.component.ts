import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'app/main/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {

  resetPassword: FormGroup;
  hide = true;
  hide1 = true;
  hide3 = true;

  id: number;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.resetPassword = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    })

  }

  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit() {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var email = userDetails['user'].email;
    const formObject = this.resetPassword.getRawValue();
    this._profileService.changePassWord(email, formObject)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Password Changed', {
          timeOut: 1500
        });
        this.dialogRef.close();
        this._authService.logout();
        this.router.navigate(['/admin/auth/login'])
      },
        errorMessage => {
          this.toastr.error('Try Again', 'Something Went Wrong', {
            timeOut: 1500
          });
          this.dialogRef.close();
        })
  }
  /**
   * On destroy
   */

 

  ngOnDestroy(): void {

  }

}
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