import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalEmployeeListComponent } from './appraisal-employee-list.component';

describe('AppraisalEmployeeListComponent', () => {
  let component: AppraisalEmployeeListComponent;
  let fixture: ComponentFixture<AppraisalEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
