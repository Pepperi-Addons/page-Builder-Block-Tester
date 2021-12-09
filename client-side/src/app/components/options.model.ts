import { ResourceType, ResourceTypes } from "@pepperi-addons/papi-sdk";

export class Resource{
	options: Array<{ key: ResourceType, value: ResourceType }> = [];

	constructor(){
		for (let resource of ResourceTypes) {
				this.options.push({
					key: resource, 
					value: resource });
			}
	}
	
};
