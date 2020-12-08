import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBooksComponent } from './assign-books.component';

describe('AssignBooksComponent', () => {
  let component: AssignBooksComponent;
  let fixture: ComponentFixture<AssignBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
