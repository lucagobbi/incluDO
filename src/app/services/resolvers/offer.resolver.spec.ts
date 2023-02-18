import { TestBed } from '@angular/core/testing';

import { OfferResolver } from './offer.resolver';

describe('OfferResolver', () => {
  let resolver: OfferResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OfferResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
