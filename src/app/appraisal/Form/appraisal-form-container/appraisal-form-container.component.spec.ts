import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormContainerComponent } from './appraisal-form-container.component';

describe('AppraisalFormContainerComponent', () => {
  let component: AppraisalFormContainerComponent;
  let fixture: ComponentFixture<AppraisalFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
