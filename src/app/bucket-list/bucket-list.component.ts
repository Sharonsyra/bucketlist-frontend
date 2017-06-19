import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {Bucket} from './bucket';

import { BucketService } from './bucket.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
  providers: [BucketService]
})
export class BucketListComponent implements OnInit{
  
  editMode : boolean = false;

  selectedId : number;

  editName: string = "";

  name : string = "";
  
  next : string = "";

  previous : string = "";

  buckets = [];

  token: string = ""

  searchTerm: string = ""

  constructor(private bucketService: BucketService, private router: Router) {
  }  

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if (this.token) {
      this.bucketService.getAllBuckets().subscribe(response => {
      if(response){
        this.buckets = response.bucketlists;
        this.previous = response.previous_page;
        this.next = response.next_page;
      }
    });     
    }
     else{
        this.router.navigate(["/users"])
     }
    }

  onAddBucket(name) {
    if (name){
      this.buckets.forEach(bucketlist => {
        if (bucketlist.name === name) {
          alert('Bucketlist already exists!');
        }
      });
    this.bucketService
    .addBucket(name)
    .subscribe(
      (newBucket) => {
        if (newBucket) {
          this.buckets = this.buckets.concat(newBucket);
          this.ngOnInit();
        } else {
          console.log('error');
        }
      }
    )
    }
    }

  onGetBucket(bucketId){
    this.router.navigate(['/bucketlist'], { queryParams: { bucketId: bucketId } })
  }

  onUpdateBucket(name, bucketId) {
    this.bucketService
    .updateBucket(name, bucketId)
    .subscribe(
      (updateBucket) => {
        let bucket = this.buckets.filter((t) => t.id == bucketId)[0];
        bucket.name = name
        this.editMode = false;
        this.selectedId = bucketId;
      }
    );
  }

  onRemoveBucket(bucketId) {
    this.bucketService
    .deleteBucketById(bucketId)
    .subscribe(
      (_) => {
        this.buckets = this.buckets.filter((t) => t.id !== bucketId);
      }
    );
  }

  onNext(){
    this.bucketService.getNext(this.next).subscribe(response  => {
    if(response){
      this.buckets = response.bucketlists
      this.previous = response.previous_page;
      this.next = response.next_page;
    }
  });
  }

  onPrevious(){
    this.bucketService.getPrevious(this.previous).subscribe(response  => {
    if(response){
      this.buckets = response.bucketlists
      this.previous = response.previous_page;
      this.next = response.next_page;
    }
  });
  }

  onSearch(searchTerm){
    this.bucketService.getSearch().subscribe(response => {
        this.buckets = response["bucketlists"].filter((t) => t.name === searchTerm)
      });    
  }

  logOut(): void {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['users']);
    }
 
}

