import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import {Bucket} from './bucket';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {
  }

  // API: GET /buckets
  public getAllBuckets() {
  	return this.http
    .get(API_URL + '/buckets')
    .map(response => {
      const buckets = response.json();
      return buckets.map((bucket) => new Bucket(bucket));
    })
    .catch(this.handleError);
  }

  // API: POST /buckets
  public createBucket(bucket: Bucket): Observable<Bucket> {
  return this.http
    .post(API_URL + '/buckets', bucket)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // API: GET /buckets/:id
public getBucketById(bucketId: number): Observable<Bucket> {
    return this.http
    .get(API_URL + '/buckets/' + bucketId)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);

  }

  // API: PUT /buckets/:id
  public updateBucket(bucket: Bucket): Observable<Bucket> {
  return this.http
    .put(API_URL + '/buckets/' + bucket.id, bucket)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // DELETE /buckets/:id
  public deleteBucketById(bucketId: number): Observable<null> {
  return this.http
    .delete(API_URL + '/buckets/' + bucketId)
    .map(response => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
	  console.error('ApiService::handleError', error);
	  return Observable.throw(error);
}

}
