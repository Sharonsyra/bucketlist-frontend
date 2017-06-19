import {Item} from '../bucket/item';

export class Bucket {
	id: number;
	name: string;
    items: Item[] = [];
	date_created : string;
	date_modified : string;
	created_by : string;

	constructor(values: Object = {}) {
       Object.assign(this, values);
    }
}
