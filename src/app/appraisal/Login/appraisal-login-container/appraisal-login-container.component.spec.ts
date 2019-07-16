import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalLoginContainerComponent } from './appraisal-login-container.component';

describe('AppraisalLoginContainerComponent', () => {
  let component: AppraisalLoginContainerComponent;
  let fixture: ComponentFixture<AppraisalLoginContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalLoginContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalLoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
