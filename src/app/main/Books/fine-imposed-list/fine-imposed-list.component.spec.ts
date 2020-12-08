import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineImposedListComponent } from './fine-imposed-list.component';

describe('FineImposedListComponent', () => {
  let component: FineImposedListComponent;
  let fixture: ComponentFixture<FineImposedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineImposedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineImposedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
