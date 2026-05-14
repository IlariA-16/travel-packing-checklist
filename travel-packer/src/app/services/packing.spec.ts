import { TestBed } from '@angular/core/testing';

import { Packing } from './packing';

describe('Packing', () => {
  let service: Packing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Packing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
