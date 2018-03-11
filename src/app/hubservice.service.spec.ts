import { TestBed, inject } from '@angular/core/testing';

import { HubserviceService } from './hubservice.service';

describe('HubserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HubserviceService]
    });
  });

  it('should be created', inject([HubserviceService], (service: HubserviceService) => {
    expect(service).toBeTruthy();
  }));
});
