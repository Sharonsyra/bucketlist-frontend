export class Bucket {
	id: number;
	name: string = '';
	items: string = '';
	date_created : string = '';
	date_modified : string = '';
	created_by : string = '';

	constructor(values: Object = {}) {
       Object.assign(this, values);
    }
}
