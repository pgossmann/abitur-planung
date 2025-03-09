import { TestBed } from '@angular/core/testing';

import { AbiturPlanungService } from './abitur-planung.service';

describe('AbiturPlanungService', () => {
  let service: AbiturPlanungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbiturPlanungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
