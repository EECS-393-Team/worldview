import { TestBed } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';
import { SitesService } from './sites.service';

describe('SitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule],}));

  it('should be created', () => {
    const service: SitesService = TestBed.get(SitesService);
    expect(service).toBeTruthy();
  });
});
