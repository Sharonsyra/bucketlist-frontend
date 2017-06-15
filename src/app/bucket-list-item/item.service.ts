import { Injectable } from '@angular/core';
import {Item} from './item';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  constructor(
      private api: ApiService
    ) {
    }

  // Simulate POST /bucketlists/:id/items/
  addItem(name, bucketId) {
    return this.api.createItem(name, bucketId);
  }

  // Simulate DELETE /bucketlists/:id/items/:id
  deleteItemById(bucketId, itemId) {
    return this.api.deleteItem(bucketId, itemId);
  }

  // Simulate PUT /bucketlists/:id/items/:id
  updateBucket(name, bucketId, itemId) {
    return this.api.updateItem(name, bucketId, itemId);
  }

  // Simulate GET /bucketlists/:id/items/
  getAllItems(bucketId): Observable<Item[]> {
    return this.api.getAllItems(bucketId);
  }

}
