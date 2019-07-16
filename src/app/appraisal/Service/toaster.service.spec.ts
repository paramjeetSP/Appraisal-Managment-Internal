import { TestBed } from '@angular/core/testing';

import { ToasterServiceCustom } from './toaster.service';

describe('ToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToasterServiceCustom = TestBed.get(ToasterServiceCustom);
    expect(service).toBeTruthy();
  });
});
