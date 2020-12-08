import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FuseConfigService } from '@fuse/services/config.service';
import { AttendanceService } from '../attendance.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDatepickerInputEvent, MatDialog, MatDatepicker, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { LeaveApplyComponent } from '../leave-apply/leave-apply.component';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  animations: fuseAnimations,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AttendanceComponent implements OnInit {
  date = new FormControl(moment());
  // date = moment().format("YYYYMMDD")
  bindDate = moment();
  maxDate  =  moment();
  staff_id: any;
  schoolID: any;

  details = { 
    totalPresentDays: 0,
    totalAbsentDays: 0,
    totalWorkingDays: 0 
  };
  constructor(
    private _fuseConfigService: FuseConfigService,
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {

    this._fuseConfigService.config = {
      layout: {
        footer: {
          hidden: true
        }
      }
    };
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));

    this.staff_id = userDetails['user_detail'][0].pk;
    this.schoolID = userDetails['user_detail'][0].fields.school_id;
  }

  // onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.date = moment(event.value)
  //   // this.events.push(`${type}: ${event.value}`);
  // }

  checkAttendance() {
    
    this.attendanceService.getAttendanceDetails(this.date.value.format("YYYYMMDD"), this.staff_id)
      .pipe()
      .subscribe(data => {
        this.toastr.success('Successfully', 'Get attendance', {
          timeOut: 1500
        });
        if (data.length != 0){
          if (data[0].hasOwnProperty('Number_of_totol_working_daye')) {
          this.details.totalPresentDays = data[0].Number_of_total_present_days;
          this.details.totalAbsentDays = data[0].Number_of_totol_working_daye - data[0].Number_of_total_present_days;
          this.details.totalWorkingDays = data[0].Number_of_totol_working_daye;
          } else {
            this.details = { 
              totalPresentDays: 0,
              totalAbsentDays: 0,
              totalWorkingDays: 0 
            };
          }
        } else {
          this.details = { 
            totalPresentDays: 0,
            totalAbsentDays: 0,
            totalWorkingDays: 0 
          };
        }
      }, error => {
        this.toastr.error('Try Again', error, {
          timeOut: 1500
        });
        this.details = { 
          totalPresentDays: 0,
          totalAbsentDays: 0,
          totalWorkingDays: 0 
        };
      });
  }

  ngOnInit() {
    this.checkAttendance();
  }
  openDialogApplyLeave() {
    const dialogRef = this.dialog.open(LeaveApplyComponent, {
      // data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }
}
