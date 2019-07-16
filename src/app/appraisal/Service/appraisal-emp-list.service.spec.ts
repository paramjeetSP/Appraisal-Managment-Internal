import { TestBed } from '@angular/core/testing';

import { AppraisalEmpListService } from './appraisal-emp-list.service';

describe('AppraisalEmpListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalEmpListService = TestBed.get(AppraisalEmpListService);
    expect(service).toBeTruthy();
  });
});
