import { Injectable } from '@angular/core';
import {Bucket} from './bucket';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BucketService {

  constructor(
      private api: ApiService
    ) {
    }

  // Simulate POST /buckets
  addBucket(name) {
    return this.api.createBucket(name);
  }

  // Simulate DELETE /buckets/:id
  deleteBucketById(bucketId) {
    return this.api.deleteBucketById(bucketId);
  }

  // Simulate PUT /buckets/:id
  updateBucket(name, bucketId) {
    return this.api.updateBucket(name, bucketId);
  }

  // Simulate GET /buckets
  getAllBuckets(): Observable<Bucket[]> {
    return this.api.getAllBuckets();
  }

  // Simulate GET /nextpage
  getNext(): Observable<Bucket[]> {
    return this.api.getNext();
  }

  // Simulate GET /previouspage
  getPrevious(): Observable<Bucket[]> {
    return this.api.getPrevious();
  }

  // Simulate GET /buckets/:id
  getBucketById(bucketId): Observable<Bucket> {
    return this.api.getBucketById(bucketId);
  }

}
