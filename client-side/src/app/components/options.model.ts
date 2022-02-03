import { ResourceType, ResourceTypes } from "@pepperi-addons/papi-sdk";

export class SelectOptions{
	resourceType: Array<{ key: ResourceType, value: ResourceType }> = [];

	//TODO: Extract paramType options from papi-sdk once implemented.
	paramType: Array<{ key: string, value: string }> = [
		{key: "String", value: "String"},
		{key: "Filter", value: "Filter"}
	];
	
	constructor(){
		for (let resource of ResourceTypes) {
				this.resourceType.push({
					key: resource, 
					value: resource });
			}
	}
};
