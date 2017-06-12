import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bucket-list-item',
  templateUrl: './bucket-list-item.component.html',
  styleUrls: ['./bucket-list-item.component.css']
})
export class BucketListItemComponent implements OnInit {
  
  @Input() bucket: Bucket;

  @Output()
  remove: EventEmitter<Bucket> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
   removeBucket(bucket: Bucket) {
    this.remove.emit(bucket);
  }

}
