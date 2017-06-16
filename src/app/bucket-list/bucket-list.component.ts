import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {Bucket} from './bucket';
import {Item} from '../bucket-list-item/item';
import {ItemService} from '../bucket-list-item/item.service'

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

  name : string = "";
  
  nexturl : string = "";

  previousurl : string = "";

  buckets = [];

  editName: string = "";

  items: Item[] = [];

  token: string = ""

  constructor(private bucketService: BucketService, private router: Router) {
  }  

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if (this.token) {
      this.bucketService.getAllBuckets().subscribe(response => {
      if(response){
        this.buckets = response
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
        } else {
          console.log('error');
        }
      }
    )
    }
    }

  onGetBucket(bucketId){
    this.bucketService.getBucketById(bucketId).subscribe(
      (singleBucket) => {
        let bucket = this.buckets.filter((t) => t.id == bucketId)[0];
      })
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
    this.bucketService.getNext().subscribe(response  => {
    if(response){
      this.buckets = response
    }
  });
  }

  onPrevious(){
    this.bucketService.getPrevious().subscribe(response  => {
    if(response){
      this.buckets = response
    }
  });
  }

  onSearch(name){
    this.bucketService.getAllBuckets().subscribe(
      (searchBucket) => {
        let bucket = this.buckets.filter((t) => t.name == name)[0]
      });    
  }

  logOut(): void {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['users']);
    }
 
}

