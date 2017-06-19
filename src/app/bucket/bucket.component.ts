import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

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
    private route: ActivatedRoute
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
    this.itemService
    .addItem(name, this.bucketId)
    .subscribe(
      (newItem) => {
        if (newItem) {
          this.items = this.items.concat(newItem);
          this.ngOnInit()
        } else {
          console.log('error');
        }
      }
    )
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
      }
    );
  }

  logOut(): void {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['users']);
    }
}

