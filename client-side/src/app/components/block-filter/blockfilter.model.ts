import { ResourceType } from "@pepperi-addons/papi-sdk";

export interface IBlockFilter extends IFilter{
	resource?: ResourceType | undefined;
}

export interface IFilter{
	FieldType?: any | undefined;
	ApiName?: any | undefined;
	Operation?: any | undefined;
	Values?: any[] | undefined;
}
  export interface IConfigBlockFilters{
	  Id: string;
	  Filters?: Array<IBlockFilter>;
  }