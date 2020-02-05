import {TestBed} from '@angular/core/testing';

import {ChatLibService} from './chat-lib.service';

describe('ChatLibService', () => {
  let service: ChatLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
