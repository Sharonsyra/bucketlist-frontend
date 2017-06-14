import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Bucket} from '../bucket-list/bucket';

@Component({
  selector: 'app-bucket-list-item',
  templateUrl: './bucket-list-item.component.html',
  styleUrls: ['./bucket-list-item.component.css']
})
export class BucketListItemComponent {
  
  @Input() bucket: Bucket;

  @Output()
  update: EventEmitter<Bucket> = new EventEmitter();

  @Output()
  remove: EventEmitter<Bucket> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
   updateBucket(bucket: Bucket) {
    this.update.emit(bucket)
  }

   removeBucket(bucket: Bucket) {
    this.remove.emit(bucket);
  }

}
