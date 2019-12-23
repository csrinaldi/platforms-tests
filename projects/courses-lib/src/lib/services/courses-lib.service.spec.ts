import { TestBed } from '@angular/core/testing';

import { CoursesLibService } from './courses-lib.service';

describe('CoursesLibService', () => {
  let service: CoursesLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
