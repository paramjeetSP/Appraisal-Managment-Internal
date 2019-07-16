import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormSummaryComponent } from './appraisal-form-summary.component';

describe('AppraisalFormSummaryComponent', () => {
  let component: AppraisalFormSummaryComponent;
  let fixture: ComponentFixture<AppraisalFormSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
