import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineImposedListPdfComponent } from './fine-imposed-list-pdf.component';

describe('FineImposedListPdfComponent', () => {
  let component: FineImposedListPdfComponent;
  let fixture: ComponentFixture<FineImposedListPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineImposedListPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineImposedListPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
