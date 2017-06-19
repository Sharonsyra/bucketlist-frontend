import { Component } from '@angular/core';
import {Bucket} from './bucket-list/bucket';
import { BucketService } from './bucket-list/bucket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BucketService]
})
export class AppComponent {

  buckets: Bucket[] = [];

  constructor() {
  }

}

