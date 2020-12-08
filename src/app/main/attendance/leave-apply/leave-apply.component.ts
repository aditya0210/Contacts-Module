import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttendanceService } from '../attendance.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss']
})
export class LeaveApplyComponent implements OnInit {
  leaveApplyForm: FormGroup
  staff_id: any;
  schoolID: any;
  leaveTypes = [];
  termDetails: any;
  startDate = moment();
  endDate = moment();
  constructor(
    public dialogRef: MatDialogRef<LeaveApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private attendanceService: AttendanceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
    this.staff_id = userDetails['user_detail'][0].pk;
    this.schoolID = userDetails['user_detail'][0].fields.school_id;
  }

  ngOnInit() {
    this.attendanceService.leaveTypes().subscribe(data => {
      this.leaveTypes = data;
    }, error => {

    });
    this.leaveApplyForm = this.fb.group({
      date_from: ['', Validators.required],
      date_to: ['', Validators.required],
      approved: 0,
      comment: ['', Validators.required],
      comment_by_facility_manager: "",
      comment_by_admin: '',
      to_admin_or_fm: 0,
      staff_id: this.staff_id,
      leave_type: ['', Validators.required],
      school_id: this.schoolID,
      term_id: this.termDetails.id
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.leaveApplyForm.invalid) {
      return;
    }
    this.leaveApplyForm.patchValue({
      date_from: moment(this.leaveApplyForm.get('date_from').value).format("YYYY-MM-DD"),
      date_to: moment(this.leaveApplyForm.get('date_to').value).format("YYYY-MM-DD")
    });
    this.attendanceService.leaveApply(this.leaveApplyForm.value)
      .subscribe(res => {
        this.toastr.success('Successfully', 'Applied Leave', {
          timeOut: 1500
        });
        this.dialogRef.close();
      }, error => {
        this.toastr.error('Try Again', 'Something went wrong', {
          timeOut: 1500
        });
      });

  }

  onDateChangeStartDate(date) {
    this.endDate = date;
  }
}
