import { Observable } from 'rxjs';
import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {PepHttpService, PepDataConvertorService, PepSessionService, PepGuid} from '@pepperi-addons/ngx-lib';
import { config } from 'src/app/addon.config';

@Injectable({ providedIn: 'root' })
export class AddonService {

    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    addonUUID = config.AddonUUID;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.addonUUID,
            actionUUID: PepGuid.newGuid(),
            suppressLogging:true
        })
    }

    constructor(
        public session:  PepSessionService
        ,public pepperiDataConverter: PepDataConvertorService
        ,private pepHttp: PepHttpService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }
    async get(endpoint: string): Promise<any> {
        return await this.papiClient.get(endpoint);
    }

    pepGet(endpoint: string): Observable<any> {
        return this.pepHttp.getPapiApiCall(endpoint);
    }

}
