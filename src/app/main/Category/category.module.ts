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
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/main/authentication/auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryListPdfComponent } from './sub-category-list-pdf/sub-category-list-pdf.component';


const routes: Routes = [
    {
        path: 'library/category',
        component: CategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/sub-category',
        component: SubCategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/sub-category-List',
        component: SubCategoryListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/sub-category-List-Pdf',
        component: SubCategoryListPdfComponent,
        canActivate: [AuthGuard]
    }


];

@NgModule({
    declarations: [
        CategoryComponent,
        SubCategoryComponent,
        SubCategoryListComponent,
        SubCategoryListPdfComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
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
        MatTabsModule,
        MatRadioModule,
        MatPaginatorModule,
        MatCardModule,
        MatSortModule,
        TranslateModule,
        MatDatepickerModule

    ],
    providers: []
})
export class CategoryModule {
}