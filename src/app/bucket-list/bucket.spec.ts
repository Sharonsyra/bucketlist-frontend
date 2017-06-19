import {Bucket} from './bucket';

describe('Bucket', () => {
  it('should create an instance', () => {
    expect(new Bucket()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let bucket = new Bucket({
      name: 'hello',
    });
    expect(bucket.name).toEqual('hello');
  });

});
