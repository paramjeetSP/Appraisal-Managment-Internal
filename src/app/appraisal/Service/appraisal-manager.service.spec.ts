import { TestBed } from '@angular/core/testing';

import { AppraisalManagerService } from './appraisal-manager.service';

describe('AppraisalManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalManagerService = TestBed.get(AppraisalManagerService);
    expect(service).toBeTruthy();
  });
});
