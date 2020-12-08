import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { FuseConfigService } from '@fuse/services/config.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DailogSessionSelectionComponent } from '../Profile/dailog-session-selection/dailog-session-selection.component';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent {
    staff_id: any;
    count = 0;
    termDetails: any;
    academicYear: any;
    count1 = 0;
    attendance = {
        scheme: {
            domain: ['#4867d2', '#5c84f1', '#89a9f4']
        },
        devices: [
            {
                name: 'Present Days',
                value: 0,
            },
            {
                name: 'Absent Days',
                value: 0,
            },
            {
                name: 'Working Days',
                value: 0,
            }
        ]
    };
    years = [{ Name: 'January', value: '01' },
    { Name: 'February ', value: '02' },
    { Name: 'March', value: '03' },
    { Name: 'April', value: '04' },
    { Name: 'May', value: '05' },
    { Name: 'June', value: '06' },
    { Name: 'July', value: '07' },
    { Name: 'August', value: '08' },
    { Name: 'September', value: '09' },
    { Name: 'October', value: '10' },
    { Name: 'November', value: '11' },
    { Name: 'December', value: '12' },
    ];
    date = moment();
    month = this.date.format('MM').toString();
    /**
     * Constructor
     *
     * @param {DashboardService} _analyticsDashboardService
     */
    constructor(
        private _dashboardService: DashboardService,
        public dialog: MatDialog,
        private _fuseConfigService: FuseConfigService
    ) {
        this._fuseConfigService.config = {
            layout: {
                footer: {
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
        this.callAllonInitAPI();
        this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
        this.academicYear = JSON.parse(sessionStorage.getItem('academicYear'));
    }


    callAllonInitAPI() {
        const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
        this.staff_id = userDetails['user_detail'][0].pk;
        this._dashboardService.getAvailableBooksNumber()
            .pipe()
            .subscribe(data => {
                for (var key in data) {
                    this.count++;
                }
            })
        this._dashboardService.getUnavailableBooksNumber()
            .pipe()
            .subscribe(data => {
                for (var key in data) {
                    this.count1++;
                }
            })
        var d = moment().format("YYYYMMDD")
        this._dashboardService.getAttendanceDetails(this.staff_id, d).subscribe(data => {
            if (data.length != 0) {
                this.attendance = {
                    scheme: {
                        domain: ['#4867d2', '#5c84f1', '#89a9f4']
                    },
                    devices: [
                        {
                            name: 'Present Days',
                            value: data[0].Number_of_total_present_days,
                        },
                        {
                            name: 'Absent Days',
                            value: data[0].Number_of_totol_working_daye - data[0].Number_of_total_present_days,
                        },
                        {
                            name: 'Working Days',
                            value: data[0].Number_of_totol_working_daye,
                        }
                    ]
                };
            } else {
                this.attendance = {
                    scheme: {
                        domain: ['#4867d2', '#5c84f1', '#89a9f4']
                    },
                    devices: [
                        {
                            name: 'Present Days',
                            value: 0,
                        },
                        {
                            name: 'Absent Days',
                            value: 0,
                        },
                        {
                            name: 'Working Days',
                            value: 0,
                        }
                    ]
                };
            }
        });
    }
    onChangeMonth(value) {

        const year = this.date.format('YYYY').toString();
        const day = this.date.format('DD').toString();
        this._dashboardService.getAttendanceDetails(this.staff_id, year + value + day).subscribe(data => {
            if (data.length != 0) {
                this.attendance = {
                    scheme: {
                        domain: ['#4867d2', '#5c84f1', '#89a9f4']
                    },
                    devices: [
                        {
                            name: 'Present Days',
                            value: data[0].Number_of_total_present_days,
                        },
                        {
                            name: 'Absent Days',
                            value: data[0].Number_of_totol_working_daye - data[0].Number_of_total_present_days,
                        },
                        {
                            name: 'Working Days',
                            value: data[0].Number_of_totol_working_daye,
                        }
                    ]
                };
            } else {
                this.attendance = {
                    scheme: {
                        domain: ['#4867d2', '#5c84f1', '#89a9f4']
                    },
                    devices: [
                        {
                            name: 'Present Days',
                            value: 0,
                        },
                        {
                            name: 'Absent Days',
                            value: 0,
                        },
                        {
                            name: 'Working Days',
                            value: 0,
                        }
                    ]
                };

            }

        });
    }

    changeSession() {
        const dialogRef = this.dialog.open(DailogSessionSelectionComponent, {
            width: '500px',
            // data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.termDetails = JSON.parse(sessionStorage.getItem('termDetails'));
            this.academicYear = JSON.parse(sessionStorage.getItem('academicYear'));
            this.count = 0;
            this.count1 = 0;
            this.callAllonInitAPI();
        });
    }
}
