import { TestBed } from '@angular/core/testing';

import { CommuniqueService } from './communique.service';

describe('CommuniqueService', () => {
  let service: CommuniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
