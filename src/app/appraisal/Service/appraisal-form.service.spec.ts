import { TestBed } from '@angular/core/testing';

import { AppraisalFormService } from './appraisal-form.service';

describe('AppraisalFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalFormService = TestBed.get(AppraisalFormService);
    expect(service).toBeTruthy();
  });
});
