import { PageConfiguration } from "@pepperi-addons/papi-sdk";

export interface IHostObject{
	configuration?: {
		blockKey : string
		[key : string] : any
	};
    pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    filter?: any;
}