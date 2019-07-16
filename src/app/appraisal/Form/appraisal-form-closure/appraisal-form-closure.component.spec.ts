import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormClosureComponent } from './appraisal-form-closure.component';

describe('AppraisalFormClosureComponent', () => {
  let component: AppraisalFormClosureComponent;
  let fixture: ComponentFixture<AppraisalFormClosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
