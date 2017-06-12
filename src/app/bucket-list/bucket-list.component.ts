import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {Bucket} from './bucket';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  
  @Input()
  buckets: Bucket[];

  @Output()
  remove: EventEmitter<Bucket> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  onRemoveBucket(bucket: Bucket) {
    this.remove.emit(bucket);
  }

}
