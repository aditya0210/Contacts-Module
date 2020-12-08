import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryListPdfComponent } from './sub-category-list-pdf.component';

describe('SubCategoryListPdfComponent', () => {
  let component: SubCategoryListPdfComponent;
  let fixture: ComponentFixture<SubCategoryListPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryListPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryListPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
