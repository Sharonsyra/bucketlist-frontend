import { TestBed, inject } from '@angular/core/testing';
import {Bucket} from './bucket';
import { BucketService } from './bucket.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketService]
    });
  });

  it('should be created', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllBuckets()', () => {

    it('should return an empty array by default', inject([BucketService], (service: BucketService) => {
      expect(service.getAllBuckets()).toEqual([]);
    }));

    it('should return all buckets', inject([BucketService], (service: BucketService) => {
      let bucket1 = new Bucket({name: 'Hello 1'});
      let bucket2 = new Bucket({name: 'Hello 2'});
      service.addBucket(bucket1);
      service.addBucket(bucket2);
      expect(service.getAllBuckets()).toEqual([bucket1, bucket2]);
    }));

  });

  describe('#save(bucket)', () => {

    it('should automatically assign an incrementing id', inject([BucketService], (service: BucketService) => {
      let bucket1 = new Bucket({name: 'Hello 1'});
      let bucket2 = new Bucket({name: 'Hello 2'});
      service.addBucket(bucket1);
      service.addBucket(bucket2);
      expect(service.getBucketById(1)).toEqual(bucket1);
      expect(service.getBucketById(2)).toEqual(bucket2);
    }));

  });

  describe('#deleteBucketById(id)', () => {

    it('should remove bucket with the corresponding id', inject([BucketService], (service: BucketService) => {
      let bucket1 = new Bucket({name: 'Hello 1'});
      let bucket2 = new Bucket({name: 'Hello 2'});
      service.addBucket(bucket1);
      service.addBucket(bucket2);
      expect(service.getAllBuckets()).toEqual([bucket1, bucket2]);
      service.deleteBucketById(1);
      expect(service.getAllBuckets()).toEqual([bucket2]);
      service.deleteBucketById(2);
      expect(service.getAllBuckets()).toEqual([]);
    }));

    it('should not removing anything if bucket with corresponding id is not found', inject([BucketService], (service: BucketService) => {
      let bucket1 = new Bucket({name: 'Hello 1'});
      let bucket2 = new Bucket({name: 'Hello 2'});
      service.addBucket(bucket1);
      service.addBucket(bucket2);
      expect(service.getAllBuckets()).toEqual([bucket1, bucket2]);
      service.deleteBucketById(3);
      expect(service.getAllBuckets()).toEqual([bucket1, bucket2]);
    }));

  });

  describe('#updateBucketById(id, values)', () => {

    it('should return bucket with the corresponding id and updated data', inject([BucketService], (service: BucketService) => {
      let bucket = new Bucket({name: 'Hello 1'});
      service.addBucket(bucket);
      let updatedBucket = service.updateBucketById(1, {
        name: 'new title'
      });
      expect(updatedBucket.name).toEqual('new title');
    }));

    it('should return null if bucket is not found', inject([BucketService], (service: BucketService) => {
      let bucket = new Bucket({name: 'Hello 1'});
      service.addBucket(bucket);
      let updatedBucket = service.updateBucketById(2, {
        title: 'new title'
      });
      expect(updatedBucket).toEqual(null);
    }));

  });

});
