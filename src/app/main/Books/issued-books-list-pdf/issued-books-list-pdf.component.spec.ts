import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedBooksListPdfComponent } from './issued-books-list-pdf.component';

describe('IssuedBooksListPdfComponent', () => {
  let component: IssuedBooksListPdfComponent;
  let fixture: ComponentFixture<IssuedBooksListPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedBooksListPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedBooksListPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
