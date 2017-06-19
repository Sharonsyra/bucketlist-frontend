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

  // Simulate POST /bucketlists/bucketId/items/
  addItem(bucketId, name) {
    return this.api.createItem(name, bucketId);
  }

  // Simulate DELETE /bucketlists/bucketId/items/itemId
  deleteItemById(bucketId, itemId) {
    return this.api.deleteItem(bucketId, itemId);
  }

  // Simulate PUT /bucketlists/bucketId/items/itemId
  updateItem(bucketId, name, itemId) {
    return this.api.updateItem(bucketId, name, itemId);
  }
}
