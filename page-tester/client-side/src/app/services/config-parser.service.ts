import { Injectable } from '@angular/core';
import { PageConfiguration, PageConfigurationParameter, PageConfigurationParameterBase } from '@pepperi-addons/papi-sdk';
import { IBlockHostObject } from 'src/models/page-block.model';

export interface SetParameterAction {
    action: 'set-parameter',
    key: string,
    value: any
}
@Injectable({ providedIn: 'root' })
export class ConfigParserService {
    constructor(
    ) {
    }

    parseParameterValues(hostObject: IBlockHostObject): SetParameterAction[] {
        const setActions: SetParameterAction[] = [];
        if (hostObject?.configuration?.Parameters) {
            hostObject.configuration.Parameters.forEach((param) => {
                setActions.push(this.getSetParameter(param.Key, param.Value));
            });
        }
        else{
            console.error("hostObject.configuration.Parameters is undefined");
            console.log("hostObject.configuration.Parameters is undefined");
        }
        return setActions;
    }
    
    getBlockId(hostObject: IBlockHostObject) : string | undefined {
        return hostObject?.configuration?.BlockId;
    }
    
    parsePageConfiguration(hostObject: IBlockHostObject): PageConfiguration {
        const paramters: PageConfigurationParameter[] = []
        if (hostObject?.configuration?.Parameters) {
            hostObject.configuration.Parameters.forEach((param) => {
                let pageParam: any = {};
                for (const key in param) {
                    if (key != "Value" && Object.prototype.hasOwnProperty.call(param, key)) {
                        pageParam[key] = param[key];
                    }
                }

                paramters.push(pageParam);
            });
        }

        return { Parameters: paramters };
    }

    getSetParameter(key: string, value: any): SetParameterAction {
        const setAction: SetParameterAction = {
            action: 'set-parameter',
            key: key,
            value: value
        }
        return setAction;
    }

}
