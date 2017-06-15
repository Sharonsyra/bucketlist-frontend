import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'

import {Item} from '../bucket-list-item/item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-bucket-list-item',
  templateUrl: './bucket-list-item.component.html',
  styleUrls: ['./bucket-list-item.component.css']
})
export class BucketListItemComponent {
  
  editMode : boolean = false;

  name : string = "";
  
  items: Item[] = [];

  editName: string = "";

  token: string = ""

  constructor(private itemService: ItemService, private router: Router) {
  }  

  ngOnInit(bucketId) {
    this.token = localStorage.getItem("token")
    if(this.token){
      this.itemService.getAllItems(bucketId).subscribe(response => {
      if(response){
        this.items = response
      }
    });
    }
    else{
      this.router.navigate(["/users"])
    }
  }

  onAddItem(name, bucketId) {
    if (name){
      this.itemService
      .addItem(name, bucketId)
      .subscribe(
        (newItem) => {
          this.items = this.items.concat(newItem);
        }
      );
    }
    }

  onUpdateBucket(name, bucketId, itemId) {
    this.itemService
      .updateBucket(name, bucketId, itemId)
      .subscribe(
        (updateBucket) => {
          let item = this.items.filter((t) => t.id == itemId)[0];
          item.name = name
        }
      );
  }

  onRemoveBucket(bucketId, itemId) {
    this.itemService
      .deleteItemById(bucketId, itemId)
      .subscribe(
        (_) => {
          this.items = this.items.filter((t) => t.id !== itemId);
        }
      );
  }

  }