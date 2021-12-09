import { PageFilter, ResourceType, ResourceTypes } from "@pepperi-addons/papi-sdk";

({ providedIn: 'root' })
export class FilterTarget implements PageFilter {

	private _resource: ResourceType | undefined;

	set Resource(value: ResourceType) {
		this._resource = value;
	}
	get Resource() {
		return this._resource;
	}

	private _fields: Array<string> | undefined;

	set Fields(value) {
		if (typeof value === "string") {
			this._fields = value ? (value as string).trim().split(',') : [];
		}
		else {
			this._fields = value;
		}
	}

	get Fields() {
		return this._fields;
	}
}