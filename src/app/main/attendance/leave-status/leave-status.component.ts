import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FuseConfigService } from '@fuse/services/config.service';
import { AttendanceService } from '../attendance.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material';
import { LeaveApplyComponent } from '../leave-apply/leave-apply.component';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
  animations: fuseAnimations
})
export class LeaveStatusComponent implements OnInit {

 
  date = moment().format("YYYYMMDD")
  bindDate = moment();
  staff_id: any;
  schoolID: any;
  leavesDetails = [];
  constructor(
    private _fuseConfigService: FuseConfigService,
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
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

  ngOnInit() {
    this.getleaveStatus();
  }

  getleaveStatus(){
    this.attendanceService.leaveStatus(this.staff_id)
    .pipe()
    .subscribe( data => {
      this.leavesDetails = data;
    }, error => {
      
    });
  }
  openDialogApplyLeave() {
    const dialogRef = this.dialog.open(LeaveApplyComponent, {
      // data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getleaveStatus()
    });
  }
}
