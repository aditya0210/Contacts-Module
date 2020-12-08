import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/main/authentication/auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [
  {
    path: 'library/attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library/leave_status',
    component: LeaveStatusComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations: [AttendanceComponent, LeaveApplyComponent, LeaveStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatCheckboxModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatSortModule,
    MatTabsModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
    TranslateModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  entryComponents: [LeaveApplyComponent]
})
export class AttendanceModule { }
