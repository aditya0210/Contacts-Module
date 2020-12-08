import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListStudentWiseComponent } from './books-list-student-wise.component';

describe('BooksListStudentWiseComponent', () => {
  let component: BooksListStudentWiseComponent;
  let fixture: ComponentFixture<BooksListStudentWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListStudentWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListStudentWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
