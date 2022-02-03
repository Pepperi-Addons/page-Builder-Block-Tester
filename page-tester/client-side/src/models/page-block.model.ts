import { PageConfiguration, PageConfigurationParameter, PageConfigurationParameterBase, PageConfigurationParameterFilter, PageConfigurationParameterString, ScreenSizeDataConfiguration } from '@pepperi-addons/papi-sdk';

export interface IBlockHostObject {
    configurationPerScreenSize?: ScreenSizeDataConfiguration;
    pageConfiguration?: PageConfiguration;
    configuration: any;
    parameters: any;
}

export interface IBlockStringParameter extends PageConfigurationParameterString {
    Value?: any;
}

export interface IBlockFilterParameter extends PageConfigurationParameterFilter {
    Filter?: IFilter
}

export interface IFilter {
    FieldType?: string;
    ApiName?: string;
    Operation?: string;
    Values: Array<any>;
}