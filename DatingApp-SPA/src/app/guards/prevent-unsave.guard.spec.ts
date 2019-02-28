import { TestBed, async, inject } from '@angular/core/testing';

import { PreventUnsaveGuard } from './prevent-unsave.guard';

describe('PreventUnsaveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventUnsaveGuard]
    });
  });

  it('should ...', inject([PreventUnsaveGuard], (guard: PreventUnsaveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
