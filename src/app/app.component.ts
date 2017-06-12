import { Component } from '@angular/core';
import {Bucket} from './bucket';
import { BucketService } from './bucket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BucketService]
})
export class AppComponent implements OnInit {

  buckets: Bucket[] = [];

  constructor(private bucketService: BucketService) {
  }
  
  public ngOnInit() {
    this.bucketService
      .getAllBuckets()
      .subscribe(
        (buckets) => {
          this.buckets = buckets;
        }
      );
  }

  onAddBucket(bucket) {
    this.bucketService
      .addBucket(bucket)
      .subscribe(
        (newBucket) => {
          this.buckets = this.buckets.concat(newBucket);
        }
      );
  }

  onRemoveBucket(bucket) {
    this.bucketService
      .deleteBucketById(bucket.id)
      .subscribe(
        (_) => {
          this.buckets = this.buckets.filter((t) => t.id !== bucket.id);
        }
      );
  }
}

}
