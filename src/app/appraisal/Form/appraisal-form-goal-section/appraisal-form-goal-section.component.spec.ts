import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormGoalSectionComponent } from './appraisal-form-goal-section.component';

describe('AppraisalFormGoalSectionComponent', () => {
  let component: AppraisalFormGoalSectionComponent;
  let fixture: ComponentFixture<AppraisalFormGoalSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormGoalSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormGoalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
