import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router'
import { NotificationsService } from 'angular2-notifications';

import {Bucket} from './bucket-list/bucket';
import {Item} from './bucket/item';
import {User} from './user/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  
    headers : any;

    base_url = "http://127.0.0.1:5000"

  constructor(
    private http: Http, 
    private router: Router,
    private service: NotificationsService   ) {
      this.headers = new Headers();
      this.headers.append('Access-Control-Allow-Origin', '*')
      this.headers.append('Content-Type', 'application/json')
  }

  public authKey(){
    let token = localStorage.getItem("token")
    this.headers.append("Authorization", "Basic " + token)
    console.log(this.headers)
  }

  //API: POST /auth/register
  public register(email, password){
    return this.http
    .post(this.base_url + "/api/v1.0/auth/register", JSON.stringify({"email": email, "password": password}), {"headers": this.headers})
    .map(response => {
      return new User(response.json());
    })
    .catch(this.handleError)
  }

  //API: POST /auth/login
  public login(email, password){
    return this.http
    .post(this.base_url + "/api/v1.0/auth/login", JSON.stringify({"email": email, "password": password}), {"headers": this.headers})
    .map(response => {
      return response 
    })
    .catch(this.handleError)
  }

  // API: GET /bucketlists
  public getAllBuckets() {
    this.authKey()
    return this.http
    .get(this.base_url + "/api/v1.0/bucketlists/", {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets;
    })
    .catch(this.handleError);
  }

  // API: GET /bucketlists/name
  public getSearch(name){
    return this.http
    .get(this.base_url + "/api/v1.0/bucketlists/" + "?q=" + <string>name, {"headers" : this.headers})
    .map(response => {
      return (response.json());
    })
    .catch(this.handleError)
  }

  //API: GET /page
  public getNext(next){
    return this.http
    .get(next, {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets;
    })
    .catch(this.handleError);
  }

  //API: GET /page
  public getPrevious(previous){
    return this.http
    .get(previous, {"headers" : this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets;
    })
    .catch(this.handleError);
  }
 

  // API: POST /bucketlists
  public createBucket(name) {
    return this.http
      .post(this.base_url + "/api/v1.0/bucketlists/", JSON.stringify({"name": name}), {"headers" : this.headers})
      .map(response => {
        return new Bucket(response.json());
      })
      .catch(this.handleError);
  }

  // API: GET /bucketlists/:id
  public getBucketById(bucketId){
    this.authKey()
    return this.http
    .get(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId, {"headers": this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // API: PUT /bucketlists/:id
  public updateBucket(name, bucketId){
  return this.http
    .put(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId, JSON.stringify({"name": name}), {"headers" : this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  // API: DELETE /bucketlists/:id
  public deleteBucketById(bucketId){
  return this.http
    .delete(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId, {"headers" : this.headers})
    .map(response => null)
    .catch(this.handleError);
  }

  // API: GET /bucketlists/:id/items
  public getAllItems(bucketId){
    return this.http
    .get(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId + "/items/", {"headers": this.headers})
    .map(response => {
      const allItems = response.json();
      return allItems.items;
    })
    .catch(this.handleError)
  }

  // API: POST /bucketlists/:id/items
  public createItem(bucketId, name) {
  return this.http
    .post(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId + "/items/", JSON.stringify({"name": name}), {"headers" : this.headers})
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  // API: PUT /bucketlists/:id/items/
  public updateItem(bucketId, name, itemId){
  return this.http
    .put(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId + "/items/" + <string>itemId, JSON.stringify({"name": name}), {"headers" : this.headers})
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  // API: DELETE /bucketlists/:id
  public deleteItem(bucketId, itemId){
  return this.http
    .delete(this.base_url + "/api/v1.0/bucketlists/" + <string>bucketId + "/items/" + <string>itemId, {"headers" : this.headers})
    .map(response => null)
    .catch(this.handleError);
  }

  public handleError (error: Response | any, router) {
	  this.service.error(
    'Some Title',
    error,
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    }
)
    console.error('ApiService::handleError', error);
    alert(error);
	  return Observable.throw(error);
}

}
