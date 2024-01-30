import { TestBed } from '@angular/core/testing';

import { HistorySidebarService } from './history-sidebar.service';

describe('HistorySidebarService', () => {
  let service: HistorySidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorySidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
