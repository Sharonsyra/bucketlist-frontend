import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, Headers } from '@angular/http';
import {Bucket} from './bucket-list/bucket';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    headers : any;
  constructor(
    private http: Http
  ) {
      this.headers = new Headers();
      this.headers.append('Authorization', "Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTc0MjEyNjIsImlhdCI6MTQ5NzQxNDA2Miwic3ViIjoxfQ.YqYZKKncPVzpuSaiQaLTy0qoC-ZnFFiZbOP-krK5cDI")
      this.headers.append('Access-Control-Allow-Origin', '*')
      this.headers.append('Content-Type', 'application/json')
  }

  // API: GET /buckets
  public getAllBuckets() {
  	return this.http
    .get("http://127.0.0.1:5000/api/v1.0/bucketlists/", {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets.bucketlists;
    })
    .catch(this.handleError);
  }

  //API: GET /page
  public getNext(){
    return this.http
    .get("http://127.0.0.1:5000/api/v1.0/bucketlists/", {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets.bucketlists.nextpage;
    })
    .catch(this.handleError);
  }

  //API: GET /page
  public getPrevious(){
    return this.http
    .get("http://127.0.0.1:5000/api/v1.0/bucketlists/", {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets.bucketlists.previouspage;
    })
    .catch(this.handleError);
  }
 

  // API: POST /buckets
  public createBucket(name) {
  return this.http
    .post("http://127.0.0.1:5000/api/v1.0/bucketlists/", JSON.stringify({"name": name}), {"headers" : this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // API: GET /buckets/:id
  public getBucketById(bucketId){
    return this.http
    .get("http://127.0.0.1:5000/api/v1.0/bucketlists/" + <string>bucketId)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);

  }

  // API: PUT /buckets/:id
  public updateBucket(name, bucketId){
  return this.http
    .put("http://127.0.0.1:5000/api/v1.0/bucketlists/" + <string>bucketId, JSON.stringify({"name": name}), {"headers" : this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // DELETE /buckets/:id
  public deleteBucketById(bucketId){
  return this.http
    .delete("http://127.0.0.1:5000/api/v1.0/bucketlists/" + <string>bucketId, {"headers" : this.headers})
    .map(response => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
	  console.error('ApiService::handleError', error);
	  return Observable.throw(error);
}

}
