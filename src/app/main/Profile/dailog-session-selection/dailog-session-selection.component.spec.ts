import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogSessionSelectionComponent } from './dailog-session-selection.component';

describe('DailogSessionSelectionComponent', () => {
  let component: DailogSessionSelectionComponent;
  let fixture: ComponentFixture<DailogSessionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailogSessionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogSessionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
