import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFineComponent } from './add-fine.component';

describe('AddFineComponent', () => {
  let component: AddFineComponent;
  let fixture: ComponentFixture<AddFineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
