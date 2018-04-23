import { TestBed, inject } from '@angular/core/testing';

import { AcquisitionService } from './acquisition.service';

describe('AcquisitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcquisitionService]
    });
  });

  it('should be created', inject([AcquisitionService], (service: AcquisitionService) => {
    expect(service).toBeTruthy();
  }));
});
