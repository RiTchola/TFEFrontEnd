import { TestBed } from '@angular/core/testing';

import { RapportDeVisiteService } from './rapport-de-visite.service';

describe('RapportDeVisiteService', () => {
  let service: RapportDeVisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportDeVisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
