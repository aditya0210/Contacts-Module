import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRequestStatusComponent } from './profile-request-status.component';

describe('ProfileRequestStatusComponent', () => {
  let component: ProfileRequestStatusComponent;
  let fixture: ComponentFixture<ProfileRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRequestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
