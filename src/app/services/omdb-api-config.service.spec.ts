import { TestBed } from '@angular/core/testing';

import { OmdbApiConfigService } from './omdb-api-config.service';

describe('OmdbApiConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbApiConfigService = TestBed.get(OmdbApiConfigService);
    expect(service).toBeTruthy();
  });
});
