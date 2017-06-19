export class Item {
	id: number;
	name: string;
	done: boolean;
	date_created : string;
	date_modified : string;
	bucketlist_id : number;

	constructor(values: Object = {}) {
       Object.assign(this, values);
    }
}
