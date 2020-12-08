import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestApproalsComponent } from './leave-request-approals.component';

describe('LeaveRequestApproalsComponent', () => {
  let component: LeaveRequestApproalsComponent;
  let fixture: ComponentFixture<LeaveRequestApproalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestApproalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestApproalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
