import { TestBed, inject } from '@angular/core/testing';
import { BucketService } from './bucket.service';
import { ApiService } from '../api.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketService,
      {
          provide: ApiService      }
      ]
    });
  });

  it('should be created', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));

});
