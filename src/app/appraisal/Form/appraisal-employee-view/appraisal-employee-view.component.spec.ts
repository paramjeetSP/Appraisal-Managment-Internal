import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalEmployeeViewComponent } from './appraisal-employee-view.component';

describe('AppraisalEmployeeViewComponent', () => {
  let component: AppraisalEmployeeViewComponent;
  let fixture: ComponentFixture<AppraisalEmployeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalEmployeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
