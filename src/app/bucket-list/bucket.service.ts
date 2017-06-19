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
  getAllBuckets(){
    return this.api.getAllBuckets();
  }

  // Simulate GET /bucketlists
  getSearch(){
    return this.api.getSearch();
  }

  // Simulate GET /bucketlists
  getNext(next){
    return this.api.getNext(next);
  }

  // Simulate GET /bucketlists
  getPrevious(previous){
    return this.api.getPrevious(previous);
  }

  // Simulate GET /bucketlists/:id
  getBucketById(bucketId): Observable<Bucket> {
    return this.api.getBucketById(bucketId);
  }

}
