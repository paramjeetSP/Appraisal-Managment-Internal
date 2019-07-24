import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormHrComponent } from './appraisal-form-hr.component';

describe('AppraisalFormHrComponent', () => {
  let component: AppraisalFormHrComponent;
  let fixture: ComponentFixture<AppraisalFormHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
