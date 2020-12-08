import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFineListComponent } from './edit-fine-list.component';

describe('EditFineListComponent', () => {
  let component: EditFineListComponent;
  let fixture: ComponentFixture<EditFineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
