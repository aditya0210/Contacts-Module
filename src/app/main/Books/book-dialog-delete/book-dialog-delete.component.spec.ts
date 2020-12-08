import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDialogDeleteComponent } from './book-dialog-delete.component';

describe('BookDialogDeleteComponent', () => {
  let component: BookDialogDeleteComponent;
  let fixture: ComponentFixture<BookDialogDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDialogDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
