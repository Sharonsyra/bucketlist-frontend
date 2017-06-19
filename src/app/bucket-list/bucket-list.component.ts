import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { NotificationsService } from 'angular2-notifications';

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

  constructor(private bucketService: BucketService, 
    private router: Router,
    private service: NotificationsService
    ) {
  }  

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if (this.token) {
      this.bucketService.getAllBuckets().subscribe(response => {
      if(response){
        this.buckets = response.bucketlists;
        this.previous = response.previous_page;
        this.next = response.next_page;
        this.service.success(
          'Success',
          "BucketLists Loaded Successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
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
          this.service.error(
          'Error',
          "BucketList Already exists!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    }
)
        }
      });

    this.bucketService
    .addBucket(name)
    .subscribe(
      (newBucket) => {
        if (newBucket) {
          this.buckets = this.buckets.concat(newBucket);
          this.ngOnInit();
          this.service.success(
          'Success!',
          "Bucketlist created!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    }
)
        } 
        else 
        {
          this.service.error(
          'Error!',
          "Error occured!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    }
)    
        }
      }
    )
    }
    else{
      this.service.info(
          'Alert',
          "Please Enter name!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
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
        this.service.success(
          'Success',
          "BucketList Updated successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    }
)
      }
    );
  }

  onRemoveBucket(bucketId) {
    this.bucketService
    .deleteBucketById(bucketId)
    .subscribe(
      (_) => {
        this.buckets = this.buckets.filter((t) => t.id !== bucketId);
        this.service.success(
          'Success',
          "BucketList Deleted successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    }
)
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
    this.bucketService.getSearch(searchTerm).subscribe(response => {
        this.buckets = response.bucketlists
        this.service.success(
          'Success',
          "Search Results!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
      });    
  }

  logOut(): void {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['users']);
      this.service.success(
          'Success',
          "User Logged Out Successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
    }
 
}

