import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { RaiseRequestComponent } from '../raise-request/raise-request.component';
export const orderStatuses = [
  {
    name: 'Pending',
    color: 'orange-500'
  },
  {
    name: 'Completed',
    color: 'green-900'
  },
  {
    name: 'Rejected',
    color: 'red-900'
  },
];
@Component({
  selector: 'app-profile-request-status',
  templateUrl: './profile-request-status.component.html',
  styleUrls: ['./profile-request-status.component.scss'],
  animations: fuseAnimations
})
export class ProfileRequestStatusComponent implements OnInit {
  staffId: any;
  profileStatus: any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['subject', 'comment', 'date', 'approval_status'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true })
  filter: ElementRef;


  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    public dialog: MatDialog,
    private profileService: ProfileService
  ) {
    this._fuseConfigService.config = {
      layout: {
        footer: {
          hidden: true
        }
      }
    };

    this._unsubscribeAll = new Subject();
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    this.staffId = userDetails['user_detail'][0].pk;

  }

  ngOnInit() {
    this.getProfileRequestDetails();
    this.profileStatus = orderStatuses;
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  getProfileRequestDetails() {
    this.profileService.getRaiseRequest(this.staffId).subscribe(data => {
      this.dataSource.data = data;
    });

  }

  openDialograiseRequest() {
    const dialogRef = this.dialog.open(RaiseRequestComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProfileRequestDetails();
    });
  }
}
