import { Injectable } from '@angular/core';
import {Bucket} from './bucket';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BucketService {

  constructor(
      private api: ApiService
    ) {
    }

// Simulate POST /buckets
  addBucket(bucket: Bucket): Observable<Bucket> {
    return this.api.createBucket(bucket);
  }

  // Simulate DELETE /buckets/:id
  deleteBucketById(bucketId: number): Observable<Bucket> {
    return this.api.deleteBucketById(bucketId);
  }

  // Simulate PUT /buckets/:id
  updateBucket(bucket: Bucket): Observable<Bucket> {
    return this.api.updateBucket(bucket);
  }

  // Simulate GET /buckets
  getAllBuckets(): Observable<Bucket[]> {
    return this.api.getAllBuckets();
  }

  // Simulate GET /buckets/:id
  getBucketById(bucketId: number): Observable<Bucket> {
    return this.api.getBucketById(bucketId);
  }

}


}
