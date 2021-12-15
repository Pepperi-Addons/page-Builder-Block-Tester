import { PageConfiguration } from "@pepperi-addons/papi-sdk";

export interface IHostObject{
	configuration?: {
		blockUuid : string
		[key : string] : any
	};
    pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    filter?: any;
}