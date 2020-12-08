import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-dailog-add-inventory-request',
  templateUrl: './dailog-add-inventory-request.component.html',
  styleUrls: ['./dailog-add-inventory-request.component.scss']
})
export class DailogAddInventoryRequestComponent implements OnInit {

  raiseRequestForm: FormGroup;
  inventoryTypeList = [];
  staff_id: number;
  schoolId: any;
  fileName = '';
  inventoryReques = false;
  termDetails: any;
  constructor(
    public dialogRef: MatDialogRef<DailogAddInventoryRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {

    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    this.staff_id = userDetails['user_detail'][0].pk;
    this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    this.schoolId = userDetails['user_detail'][0].fields.school_id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.profileService.getInventoryTypes().subscribe(data => {
      this.inventoryTypeList = data;
    }, error => {

    });
    this.raiseRequestForm = this.fb.group({

      // staff_id: [this.staff_id],
      inventory_request_id: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      comment: ['', [Validators.required]],
      term_id: this.termDetails.id
      // attachment: [''],
      // approval_admin: [1],
      // approval_facility_manager: [1],
      // date: [moment().format('YYYY-MM-DD')]
    });
  }
  // onChangingimg(files) {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   this.raiseRequestForm.patchValue({
  //     attachment: files[0]
  //   });
  //   this.fileName = files[0].name;
  // }

  onSubmit() {
    if (this.raiseRequestForm.invalid) {
      return;
    }

    this.profileService.inventoryRaiseRequest(this.staff_id, this.raiseRequestForm.value).subscribe(res => {
      this.toastr.success('Successfully', 'Send Request', {
        timeOut: 1500
      });
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });

    });


  }

}
