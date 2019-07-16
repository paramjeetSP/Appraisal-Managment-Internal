import { TestBed } from '@angular/core/testing';

import { AppraisalLoginService } from './appraisal-login.service';

describe('AppraisalLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalLoginService = TestBed.get(AppraisalLoginService);
    expect(service).toBeTruthy();
  });
});
