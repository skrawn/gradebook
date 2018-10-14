import { TestBed } from '@angular/core/testing';

import { GradebookService } from './gradebook.service';

describe('GradebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradebookService = TestBed.get(GradebookService);
    expect(service).toBeTruthy();
  });
});
