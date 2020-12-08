import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRequestStatusComponent } from './inventory-request-status.component';

describe('InventoryRequestStatusComponent', () => {
  let component: InventoryRequestStatusComponent;
  let fixture: ComponentFixture<InventoryRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRequestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
