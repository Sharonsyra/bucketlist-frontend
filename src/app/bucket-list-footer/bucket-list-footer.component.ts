import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bucket-list-footer',
  templateUrl: './bucket-list-footer.component.html',
  styleUrls: ['./bucket-list-footer.component.css']
})
export class BucketListFooterComponent implements OnInit {

  @Input()
  buckets: Bucket[];

  constructor() { }

  ngOnInit() {
  }

}
