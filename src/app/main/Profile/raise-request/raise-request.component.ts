import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.scss']
})
export class RaiseRequestComponent implements OnInit {

  raiseRequestForm: FormGroup;
  termDetails: any;
  inventoryTypeList = [];
  staff_id: number;
  schoolId: any;


  fileName = '';
  inventoryReques = false;
  constructor(
    public dialogRef: MatDialogRef<RaiseRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {
    // if( data === 1) {
    //   this.inventoryReques = true;
    // } else {
    //   this.inventoryReques = false;
    // }
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    this.schoolId = userDetails['user_detail'][0].fields.school_id;
    this.staff_id = userDetails['user_detail'][0].pk;
    this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.inventoryService.getInventoryTypes().subscribe(data => {
    //   this.inventoryTypeList = data;
    // }, error => {

    // });
    this.raiseRequestForm = this.fb.group({

      staff_id: [this.staff_id],
      inventory_type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      attachment: [''],
      approval_admin: [0],
      approval_facility_manager: [0],
      date: [moment().format("YYYY-MM-DD")]
    });
  }
  onChangingimg(files) {
    if (files.length === 0) {
      return;
    }

    this.raiseRequestForm.patchValue({
      attachment: files[0]
    });
    this.fileName = files[0].name;
  }
  onSubmit() {
    if (this.raiseRequestForm.invalid) {
      return;
    }
    // let formData = new FormData();
    // formData.append('attachment', this.raiseRequestForm.get('attachment').value);
    // Object.keys(this.raiseRequestForm.value).forEach(ele =>{
    //   if (ele !== 'attachment') {
    //     formData.append(ele, this.raiseRequestForm.get(ele).value);
    //   }
    // });
    // if( this.inventoryReques == true) {
    //   this.inventoryService.raiseRequest(formData).subscribe( res => {
    //     this.dialogRef.close();
    //   }, error => {

    //   });
    // }
    const obj = {
      subject: this.raiseRequestForm.get('inventory_type').value,
      comment: this.raiseRequestForm.get('description').value,
      attachment: null,
      staff_or_parent: 0,
      approval_status: 0,
      school_id: this.schoolId,
      staff_id: this.staff_id,
      term_id: this.termDetails.id
    };
    let formData = new FormData();
    formData.append('attachment', this.raiseRequestForm.get('attachment').value);
    Object.keys(obj).forEach(ele => {
      if (ele !== 'attachment') {
        formData.append(ele, obj[ele]);
      }
    });
    this.profileService.raiseRequest(formData).subscribe(res => {
      this.toastr.success('Successfully', 'Send Request', {
        timeOut: 1500
      });
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Try Again', error, {
        timeOut: 1500
      });

    });

  }

}
