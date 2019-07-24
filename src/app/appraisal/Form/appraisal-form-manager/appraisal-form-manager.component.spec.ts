import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormManagerComponent } from './appraisal-form-manager.component';

describe('AppraisalFormManagerComponent', () => {
  let component: AppraisalFormManagerComponent;
  let fixture: ComponentFixture<AppraisalFormManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
