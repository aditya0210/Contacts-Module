import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-dailog-session-selection',
  templateUrl: './dailog-session-selection.component.html',
  styleUrls: ['./dailog-session-selection.component.scss']
})
export class DailogSessionSelectionComponent implements OnInit {

  academicYears = [];
  termList = [];
  sessionForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DailogSessionSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: ProfileService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.commonService.getAcademicYear().subscribe(data => {
      this.academicYears = data;
    }, error => {
      this.academicYears = [];
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });

    this.sessionForm = this.fb.group({
      academicYear: ['', [Validators.required]],
      term: ['', [Validators.required]]
    });

    this.sessionForm.get('academicYear').valueChanges.subscribe(yearid => {
      sessionStorage.setItem('academicYear', JSON.stringify(this.academicYears.find(ele => ele.id == yearid)))
      this.commonService.getTermdetails(yearid).subscribe(data => {
        this.termList = data;
      }, error => {
        this.termList = [];
        this.toastr.error('Try Again', 'Something went wrong', {
          timeOut: 1500
        });
      });
    });
  }


  onSubmit() {
    if (this.sessionForm.invalid) {
      return;
    }
    sessionStorage.setItem('termDetails', JSON.stringify(this.sessionForm.get('term').value));
    this.dialogRef.close();
    this.router.navigate(['/library/dashboard']);
  }
}
