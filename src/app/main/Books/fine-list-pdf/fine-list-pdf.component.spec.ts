import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineListPdfComponent } from './fine-list-pdf.component';

describe('FineListPdfComponent', () => {
  let component: FineListPdfComponent;
  let fixture: ComponentFixture<FineListPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineListPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineListPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
