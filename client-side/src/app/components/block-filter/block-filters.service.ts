import { PapiClient, AddonData } from '@pepperi-addons/papi-sdk'
import { AddonService } from '../addon';
import { IBlockFilter } from './blockfilter.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BlockFilterData extends AddonData {
    BlockFiltersJson: Array<string>
}
@Injectable({ providedIn: 'root' })
export class BlockFiltersService {

    papiClient: PapiClient;
    private _blockKey: string;
    set blockKey(value: string) {
        if (value) {
            this._blockKey = value;
            this.getFiltersData();
        }
    }
    get blockKey() {
        return this._blockKey;
    }

    private _jsonFilters = new BehaviorSubject<Array<IBlockFilter>>([]);
    public jsonFilters$ = this._jsonFilters.asObservable();

    constructor(private addonService: AddonService) {
        this.papiClient = addonService.papiClient;
    }

    updateFiltersData(blockFilters: IBlockFilter[]) {
        const filtersData: BlockFilterData = {
            Key: this.blockKey,
            BlockFiltersJson: this.convertToJsonArray(blockFilters)
        };
        this.addonService.getFiltersEndpoint()
            .post(undefined, filtersData)
            .then((addonData) => {
                this._jsonFilters.next(this.toFiltersArray(addonData))
            });
    }

    getFiltersData() {
        this.addonService.getFiltersEndpoint()
            .get({ Key: this.blockKey })
            .then((addonData) => {
                this._jsonFilters.next(this.toFiltersArray(addonData))
            },
                (reason) => {
                    if (reason.message.includes("Object ID does not exist")) {
                        console.warn(`Block key ${this.blockKey} does not exist in ADAL table`);
                    }
                    else {
                        throw new Error(reason);
                    }
                });
    }


    private toFiltersArray(addonData: AddonData): Array<IBlockFilter> {
        const blockFiltersArray: Array<IBlockFilter> = [];
        const addonDataFilter = <BlockFilterData>addonData;
        console.log(`Received addon data filter: ${JSON.stringify(addonDataFilter)}`)
        if (addonDataFilter?.BlockFiltersJson) {
            addonDataFilter.BlockFiltersJson.forEach((filterJson) => {
                blockFiltersArray.push(JSON.parse(filterJson));
            });
        }

        return blockFiltersArray;
    }


    private convertToJsonArray(blockFilters: IBlockFilter[]) {
        const blockFiltersJson: Array<string> = [];
        blockFilters.forEach((filter) => {
            blockFiltersJson.push(JSON.stringify(filter));
        });
        return blockFiltersJson;
    }
}