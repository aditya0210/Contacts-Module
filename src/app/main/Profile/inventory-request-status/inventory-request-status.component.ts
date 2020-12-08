import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DailogAddInventoryRequestComponent } from '../dailog-add-inventory-request/dailog-add-inventory-request.component';
import { ProfileService } from '../profile.service';
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
  selector: 'app-inventory-request-status',
  templateUrl: './inventory-request-status.component.html',
  styleUrls: ['./inventory-request-status.component.scss'],
  animations: fuseAnimations
})
export class InventoryRequestStatusComponent implements OnInit {
  staffId: any;
  inventoryStatus: any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['inventory_name', 'comment', 'quantity', 'remaining_quantity', 'date', 'approval_accountant'];

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
    this.getInventoryRequestDetails();
    this.inventoryStatus = orderStatuses;
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

  getInventoryRequestDetails() {
    this.profileService.getInventoryRequrstDetails(this.staffId).subscribe(data => {

      this.dataSource.data = data;
    });
  }
  openDialograiseRequest() {
    const dialogRef = this.dialog.open(DailogAddInventoryRequestComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInventoryRequestDetails();
    });
  }
}
