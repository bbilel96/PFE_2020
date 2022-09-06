import { TestBed } from '@angular/core/testing';

import { CommandService } from './command-service.service';

describe('CommandServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandService = TestBed.get(CommandService);
    expect(service).toBeTruthy();
  });
});
