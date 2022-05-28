import { TestBed } from '@angular/core/testing';

import { ConstableService } from './constable.service';

describe('ConstableService', () => {
  let service: ConstableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
