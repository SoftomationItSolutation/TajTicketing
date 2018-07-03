import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SloatManagementComponent } from './sloat-management.component';

describe('SloatManagementComponent', () => {
  let component: SloatManagementComponent;
  let fixture: ComponentFixture<SloatManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SloatManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SloatManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
