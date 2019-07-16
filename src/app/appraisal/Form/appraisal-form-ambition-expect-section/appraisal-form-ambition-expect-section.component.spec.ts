import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormAmbitionExpectSectionComponent } from './appraisal-form-ambition-expect-section.component';

describe('AppraisalFormAmbitionExpectSectionComponent', () => {
  let component: AppraisalFormAmbitionExpectSectionComponent;
  let fixture: ComponentFixture<AppraisalFormAmbitionExpectSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormAmbitionExpectSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormAmbitionExpectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
