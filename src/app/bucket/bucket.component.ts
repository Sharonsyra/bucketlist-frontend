import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { NotificationsService } from 'angular2-notifications';

import { Bucket } from '../bucket-list/bucket';
import { BucketService } from '../bucket-list/bucket.service'
import { ItemService } from './item.service'
import { Item } from './item'

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
  providers: [BucketService, ItemService]
})
export class BucketComponent implements OnInit {

  editMode : boolean = false;

  selectedId : number;

  editName: string = "";

  bucketId : number;

  bucket: Bucket = new Bucket;

  token: string = "";

  items: Item[] = [];

  constructor(
    private itemService: ItemService, 
    private bucketService: BucketService, 
    private router: Router, 
    private route: ActivatedRoute,
    private service: NotificationsService
    ) { 
  
   }

  ngOnInit() {
   this.token = localStorage.getItem("token")
  	if(this.token){
  		this.route.queryParams.subscribe(params => {
  		this.bucketId = +params['bucketId'];
  		this.bucketService.getBucketById(this.bucketId).subscribe(
	      	(singleBucket) => {
	      		console.log("text", singleBucket)
	        this.bucket = singleBucket;
      })
  	})
  	}
  	else{
  		this.router.navigate(["/users"])
  	}
  	console.log("tsavo", this.bucket)
  }

  onAddItem(bucketId, name){
    if(name){

   this.bucket.items.forEach(item => {
        if (item.name === name) {
          this.service.error(
          'Error',
          "Item Already exists!",
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

    this.itemService
    .addItem(name, this.bucketId)
    .subscribe(
      (newItem) => {
        if (newItem) {
          this.items = this.items.concat(newItem);
          this.ngOnInit()
          this.service.success(
          'Success',
          "Item Created Successfully!",
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
    })              
        }
  })
}
else
{
        this.service.info(
          'Alert',
          "Please Enter name!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
}
}

  onUpdateItem(bucketId, name, itemId){
    this.itemService
    .updateItem(this.bucketId, name, itemId)
    .subscribe(
      (updateItem) => {
        let item = this.bucket.items.filter((t) => t.id == itemId)[0];
        item.name = name
        this.editMode = false;
        this.selectedId = itemId;
        this.ngOnInit()
        this.service.success(
          'Success',
          "Item Updated Successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
      }
    );
  }

  onRemoveItem(bucketId, itemId){
    this.itemService
    .deleteItemById(this.bucketId, itemId)    
    .subscribe(
      (_) => {
        this.items = this.items.filter((t) => t.id !== itemId);
        this.ngOnInit()
        this.service.success(
          'Success',
          "Item Deleted Successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
      }
    );
  }

  logOut(): void {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['users']);
      this.service.success(
          'Success',
          "User logged out successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
    }
}

