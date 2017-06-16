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

  // Simulate POST /bucketlists
  addBucket(name) {
    return this.api.createBucket(name);
  }

  // Simulate DELETE /bucketlists/:id
  deleteBucketById(bucketId) {
    return this.api.deleteBucketById(bucketId);
  }

  // Simulate PUT /bucketlists/:id
  updateBucket(name, bucketId) {
    return this.api.updateBucket(name, bucketId);
  }

  // Simulate GET /bucketlists
  getAllBuckets(): Observable<Bucket[]> {
    return this.api.getAllBuckets();
  }

  // Simulate GET /bucketlists
  getSearch(): Observable<Bucket[]>{
    return this.api.getSearch();
  }

  // Simulate GET /bucketlists
  getNext(): Observable<Bucket[]> {
    return this.api.getNext();
  }

  // Simulate GET /bucketlists
  getPrevious(): Observable<Bucket[]> {
    return this.api.getPrevious();
  }

  // Simulate GET /bucketlists/:id
  getBucketById(bucketId): Observable<Bucket> {
    return this.api.getBucketById(bucketId);
  }

}
