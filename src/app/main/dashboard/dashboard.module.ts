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
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthGuard } from '../authentication/auth.guard';
import { TranslateModule } from '@ngx-translate/core';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoryModule } from '../Category/category.module';
import { BooksModule } from '../Books/books.module';
import { ProfileModule } from '../Profile/profile.module';
import { AttendanceModule } from '../attendance/attendance.module';

const routes: Routes = [
    {
        path: 'library/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }

];

@NgModule({
    declarations: [
        DashboardComponent,

    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        ChartsModule,
        NgxChartsModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatCheckboxModule,
        FuseSharedModule,
        MatTabsModule,
        MatRadioModule,
        MatCardModule,
        TranslateModule,
        CategoryModule,
        BooksModule,
        ProfileModule,
        AttendanceModule
    ],
    providers: [DashboardService]
})
export class DashboardModule {
}