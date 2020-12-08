import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListStudentWisePdfComponent } from './book-list-student-wise-pdf.component';

describe('BookListStudentWisePdfComponent', () => {
  let component: BookListStudentWisePdfComponent;
  let fixture: ComponentFixture<BookListStudentWisePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListStudentWisePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListStudentWisePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
