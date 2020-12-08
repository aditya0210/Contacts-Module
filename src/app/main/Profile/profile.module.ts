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
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RaiseRequestComponent } from './raise-request/raise-request.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { ProfileRequestStatusComponent } from './profile-request-status/profile-request-status.component';
import { InventoryRequestStatusComponent } from './inventory-request-status/inventory-request-status.component';
import { DailogAddInventoryRequestComponent } from './dailog-add-inventory-request/dailog-add-inventory-request.component';
import { LeaveRequestApprovalsComponent } from './leave-request-approals/leave-request-approals.component';
import { DailogSessionSelectionComponent } from './dailog-session-selection/dailog-session-selection.component';


const routes: Routes = [
    {
        path: 'library/profile_info',
        component: ProfileInfoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/profile_status',
        component: ProfileRequestStatusComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/inventory_status',
        component: InventoryRequestStatusComponent,
        canActivate: [AuthGuard]
    },


];

@NgModule({
    declarations: [
        ProfileInfoComponent,
        RaiseRequestComponent,
        ResetPasswordDialogComponent,
        ProfileRequestStatusComponent,
        InventoryRequestStatusComponent,
        DailogAddInventoryRequestComponent,
        LeaveRequestApprovalsComponent,
        DailogSessionSelectionComponent
    ],
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
    entryComponents: [RaiseRequestComponent, DailogSessionSelectionComponent, ResetPasswordDialogComponent, InventoryRequestStatusComponent, DailogAddInventoryRequestComponent],
    providers: []
})
export class ProfileModule {
}