import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogAddInventoryRequestComponent } from './dailog-add-inventory-request.component';

describe('DailogAddInventoryRequestComponent', () => {
  let component: DailogAddInventoryRequestComponent;
  let fixture: ComponentFixture<DailogAddInventoryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailogAddInventoryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogAddInventoryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
