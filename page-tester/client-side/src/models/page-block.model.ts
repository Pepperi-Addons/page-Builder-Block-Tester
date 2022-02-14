import { PageBlock, PageConfigurationParameterFilter, PageConfigurationParameterString, ResourceType} from '@pepperi-addons/papi-sdk';

export interface IBlockHostObject extends Partial<PageBlock>{
    parameters?: {[key: string]: any};
}

export interface IBlockStringParameter extends PageConfigurationParameterString {
    Value?: any;
}

export interface IBlockFilterParameter extends PageConfigurationParameterFilter {
    Filter?: IFilter
}

export interface IFilter {
    resource?: ResourceType,
    filter?: {
        FieldType?: string;
        ApiName?: string;
        Operation?: string;
        Values?: Array<any>;
    }
    
}