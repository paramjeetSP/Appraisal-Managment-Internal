import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalManagerContainerComponent } from './appraisal-manager-container.component';

describe('AppraisalManagerContainerComponent', () => {
  let component: AppraisalManagerContainerComponent;
  let fixture: ComponentFixture<AppraisalManagerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalManagerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalManagerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
