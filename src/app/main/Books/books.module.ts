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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/main/authentication/auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NewBooksComponent } from './new-books/new-books.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { AvailableBooksService } from './available-books/available-books.service';
import { AssignBooksComponent } from './assign-books/assign-books.component';
import { AvailableBooksPdfComponent } from './available-books-pdf/available-books-pdf.component';
import { IssuedBooksListPdfComponent } from './issued-books-list-pdf/issued-books-list-pdf.component';
import { BookDialogDeleteComponent } from './book-dialog-delete/book-dialog-delete.component';
import { EditBooksComponent } from './edit-books/edit-books.component';
import { StudentsComponent } from './students/students.component';
import { StudentService } from './students/student.service';
import { BooksListStudentWiseComponent } from './books-list-student-wise/books-list-student-wise.component';
import { BookListStudentWisePdfComponent } from './book-list-student-wise-pdf/book-list-student-wise-pdf.component';
import { AddFineComponent } from './add-fine/add-fine.component';
import { FineImposedListComponent } from './fine-imposed-list/fine-imposed-list.component';
import { FineListPdfComponent } from './fine-list-pdf/fine-list-pdf.component';
import { IssueBooksComponent } from './issue-books/issue-books.component';
import { EditFineListComponent } from './edit-fine-list/edit-fine-list.component';
import { FineImposedListPdfComponent } from './fine-imposed-list-pdf/fine-imposed-list-pdf.component';


const routes: Routes = [
    {
        path: 'library/new-books',
        component: NewBooksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/return-books',
        component: ReturnBooksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/assign-books',
        component: AssignBooksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/available-books',
        component: AvailableBooksComponent,
        resolve: {
            data: AvailableBooksService
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'library/available-books-list-Pdf',
        component: AvailableBooksPdfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/issued-books-list-Pdf',
        component: IssuedBooksListPdfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/edit-book/:id',
        component: EditBooksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/students-List',
        component: StudentsComponent,
        resolve: {
            data: StudentService
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'library/book-List/:id',
        component: BooksListStudentWiseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/assigned-book-List-Pdf',
        component: BookListStudentWisePdfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/add-fine',
        component: AddFineComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/imposed-fine-list',
        component: FineImposedListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/edit-imposed-fine-list/:id',
        component: EditFineListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/imposed-fine-list-Pdf',
        component: FineListPdfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/issue-books',
        component: IssueBooksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'library/fine-receipt/:id',
        component: FineImposedListPdfComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [
        NewBooksComponent,
        ReturnBooksComponent,
        AssignBooksComponent,
        AvailableBooksComponent,
        AvailableBooksPdfComponent,
        IssuedBooksListPdfComponent,
        BookDialogDeleteComponent,
        EditBooksComponent,
        StudentsComponent,
        BooksListStudentWiseComponent,
        BookListStudentWisePdfComponent,
        AddFineComponent,
        FineImposedListComponent,
        FineListPdfComponent,
        IssueBooksComponent,
        EditFineListComponent,
        FineImposedListPdfComponent
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
        MatAutocompleteModule,
        MatRadioModule,
        MatPaginatorModule,
        MatCardModule,
        MatSortModule,
        TranslateModule,
        MatDatepickerModule

    ],
    entryComponents: [BookDialogDeleteComponent],
    providers: []
})
export class BooksModule {
}