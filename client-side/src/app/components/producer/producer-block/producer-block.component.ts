import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageFilter, PageProduce, ResourceType} from '@pepperi-addons/papi-sdk';
import { KeyValuePair } from '@pepperi-addons/ngx-lib';

@Component({
    selector: 'producer-block',
    templateUrl: './producer-block.component.html',
    styleUrls: ['./producer-block.component.css']
})
export class ProducerBlockComponent implements OnInit {
    private _hostObject: any;
    @Input()
    set hostObject(value: any) {
        this._hostObject = value;
        this.handleHostObjectChange();
    }
    get hostObject(): any {
        return this._hostObject;
    }

    pageProduce : PageProduce;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    isFilter1Enabled : boolean = false;
    isFilter2Enabled : boolean = false;

    clickCount = 0;
    jsonConsumedFilter: any;
    jsonProducedFilter: string[] = [];

    constructor(private translate: TranslateService) { }

    private handleHostObjectChange() {
        if(this.hostObject?.pageConfiguration?.Produce){
            this.pageProduce = this.hostObject.pageConfiguration.Produce;
        }
        if (this.hostObject?.filter) {
            // alert(`Filter change in SubAddon3 with value ${JSON.stringify(this.hostObject?.filter)}`);
            this.jsonConsumedFilter = JSON.stringify(this.hostObject?.filter);

        }
    }
    private updateProducedOutput() {
        let temp : string[] = [];
        for(let _filter of this.filters){
            temp.push(JSON.stringify(_filter.Value));
        }
        this.jsonProducedFilter = temp;

        // this.jsonProducedFilter = JSON.stringify(this.filters);
    }

    changeIsFilter1Enabled(){
        this.isFilter1Enabled = !this.isFilter1Enabled;
        this.updateProducedFilters(this.getProducedFilter1(this.clickCount), this.isFilter1Enabled); 
    }

    updateProducedFilters(filter : KeyValuePair<Filter>, toAdd: boolean)
    {
        const index = this.filters.findIndex(x=> x.Key == filter.Key);
        if(index >= 0)
                this.filters.splice(index, 1);
        if(toAdd){
            this.filters.push(filter);
        }
        this.updateProducedOutput();
    }

    changeIsFilter2Enabled(){
        this.isFilter2Enabled = !this.isFilter2Enabled;
        this.updateProducedFilters(this.getProducedFilter2(this.clickCount), this.isFilter2Enabled);
    }
    ngOnInit(): void {
        this.hostEvents.emit({action: 'block-loaded'});
    }
    getProducedFilter1(clickCount : number) : KeyValuePair<Filter>{
        return {
            Key: '123',
            Value:{
            key: '123',
            resource: 'accounts',
            // key: '123',
    
            // what resource the filter field is.
            
            // a JSON filter. One layer, complex (AND OR) operations not allowed
            filter: {
                // FieldType: "yada",
                ApiName: "Type",
                Operation: "IsEqual",
                // Values: this.clickCount < 2 ? ["Customer"] : (this.clickCount < 8 ? ["Customer123"] : ["Customer456"])
                Values: this.clickCount
            }}
        }
    }
    
    getProducedFilter2(clickCount : number) : KeyValuePair<Filter>
    {
        return {
            // a unique key to later update this filter with
            Key: '456',
            // Key: '123',

            Value:{// what resource the filter field is.
            key: '123',
            resource: 'transactions',
            // a JSON filter. One layer, complex (AND OR) operations not allowed
            filter: {
                FieldType: "String",
                ApiName: "Status",
                Operation: "IsEqual",
                Values: `${clickCount}`
            }}
        };
    }   
        
    filters : KeyValuePair<Filter>[] = [];
    onBtnClick(event) {
        
        this.hostEvents.emit({
            action: 'set-filters',
            filters: this.filters.map(x=>x.Value)});
        console.log(this.filters);
        this.clickCount++;
        this.updateProducedFilters(this.getProducedFilter1(this.clickCount), this.isFilter1Enabled);
        this.updateProducedFilters(this.getProducedFilter2(this.clickCount), this.isFilter2Enabled);

    }
    
}
interface Filter {
        resource: ResourceType;
        key?: string;
        filter: {
            FieldType?: string;
            ApiName?: string;
            Operation?: string;
            Values?: any;
        }
    }
