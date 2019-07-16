import { TestBed } from '@angular/core/testing';

import { CommonTaskService } from './common-task.service';

describe('CommonTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonTaskService = TestBed.get(CommonTaskService);
    expect(service).toBeTruthy();
  });
});
