import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { RaiseRequestComponent } from '../raise-request/raise-request.component';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../profile.service';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  animations: fuseAnimations
})
export class ProfileInfoComponent implements OnInit {
  profile: FormGroup;
  userDetails: any;
  staffId: any;
  profileImg = require('../../../../assets/images/avatars/profile.jpg');
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    public dialog: MatDialog,
    private _profileService: ProfileService,
    private toastr: ToastrService
  ) {
    this._fuseConfigService.config = {
      layout: {
        footer: {
          hidden: true
        }
      }
    };
    this.userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profileImg = sessionStorage.getItem('profileImg');
    if (this.profileImg == 'https://online-edu.in/media/') {
      this.profileImg = require('../../../../assets/images/avatars/profile.jpg');
    }
    this.staffId = this.userDetails['user_detail'][0].pk;

  }
  ngOnInit() {

  }

  resetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '450px',
    });
  }

  raiseRequestDialog(): void {
    const dialogRef = this.dialog.open(RaiseRequestComponent, {
      width: '500px',
    });
  }

  onChangingimg(files) {
    if (files.length === 0) {
      return;
    }
    var formData = new FormData();
    formData.append("photo", files[0]);
    this._profileService.uploadProfile(formData, this.staffId).subscribe(res => {
      sessionStorage.setItem('profileImg', res.photo);
      this.profileImg = res.photo;
      this.toastr.success('Successfully', 'Profile Picture Uploaded', {
        timeOut: 1500
      });
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });
  }
  onClickIcon() {
    document.getElementById("fileInput").click();
  }
}