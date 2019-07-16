import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormBehaviouralGoalSectionComponent } from './appraisal-form-behavioural-goal-section.component';

describe('AppraisalFormBehaviouralGoalSectionComponent', () => {
  let component: AppraisalFormBehaviouralGoalSectionComponent;
  let fixture: ComponentFixture<AppraisalFormBehaviouralGoalSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormBehaviouralGoalSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormBehaviouralGoalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
