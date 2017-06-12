import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bucket-list-header',
  templateUrl: './bucket-list-header.component.html',
  styleUrls: ['./bucket-list-header.component.css']
})
export class BucketListHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output()
  add: EventEmitter<Bucket> = new EventEmitter();

  addBucket() {
    this.add.emit(this.newBucket);
    this.newBucket = new Bucket();
  }


}
