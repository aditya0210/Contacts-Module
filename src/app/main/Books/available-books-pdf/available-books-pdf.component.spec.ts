import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBooksPdfComponent } from './available-books-pdf.component';

describe('AvailableBooksPdfComponent', () => {
  let component: AvailableBooksPdfComponent;
  let fixture: ComponentFixture<AvailableBooksPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableBooksPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableBooksPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
