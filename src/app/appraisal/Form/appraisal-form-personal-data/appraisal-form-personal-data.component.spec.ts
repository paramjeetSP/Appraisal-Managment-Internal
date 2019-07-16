import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormPersonalDataComponent } from './appraisal-form-personal-data.component';

describe('AppraisalFormPersonalDataComponent', () => {
  let component: AppraisalFormPersonalDataComponent;
  let fixture: ComponentFixture<AppraisalFormPersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormPersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
