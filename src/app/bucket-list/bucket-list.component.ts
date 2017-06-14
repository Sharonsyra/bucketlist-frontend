import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

  name : string = "";
  
  nexturl : string = "";

  previousurl : string = "";

  buckets: Bucket[] = [];

  editName: string = "";

  constructor(private bucketService: BucketService) {
  }  

  ngOnInit() {
    this.bucketService.getAllBuckets().subscribe(response => {
      if(response){
        this.buckets = response
        console.log(response)
      }
    });
  }

  onAddBucket(name) {
    if (name){
      this.bucketService
      .addBucket(name)
      .subscribe(
        (newBucket) => {
          this.buckets = this.buckets.concat(newBucket);
        }
      );
    }
    }

  onGetBucket(bucketId){
    this.bucketService.getBucketById(bucketId).subscribe(
      (singleBucket) => {
        let bucket = this.buckets.filter((t) => t.id == bucketId)[0];
        console.log(Bucket)
      })
  }

  onUpdateBucket(name, bucketId) {
    this.bucketService
      .updateBucket(name, bucketId)
      .subscribe(
        (updateBucket) => {
          let bucket = this.buckets.filter((t) => t.id == bucketId)[0];
          bucket.name = name
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

}

