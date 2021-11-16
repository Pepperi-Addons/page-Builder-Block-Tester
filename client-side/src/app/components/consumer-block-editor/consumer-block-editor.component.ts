import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration, ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';

@Component({
    selector: 'consumer-block-editor',
    templateUrl: './consumer-block-editor.component.html',
    styleUrls: ['./consumer-block-editor.component.scss']
})
export class ConsumerBlockEditorComponent implements OnInit {
    // @Input() hostObject: any;
    @Input()
    set hostObject(value) {
        if (value && value.configuration) {
            this._configuration = value.configuration
        } else {
            this._configuration = {consumerResource: "None"};
        }
    }

    private _configuration: ConsumeEditorConfig;
    get configuration(): ConsumeEditorConfig {
        return this._configuration;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    options: {key:ResourceType, value:ResourceType}[] = this.initOptions();

    // configuration: ConsumeEditorConfig;

    inputTitle = '';
    currIndex = 0;
    
    constructor(private translate: TranslateService) { }

    private getDefaultPageConfiguration() {
        const pageConfiguration : PageConfiguration = {
            Consume: {
                Filter: {
                    Resource: this.configuration.consumerResource,
                    Fields:  ["UnitsQuantity","Transaction.Account.Type","Item.TSABrand","Transaction.Status", "Type", "Status"],//   
                },
                Context: {
                    Resource: "transactions"
                }
            },
            Produce: {
                Filters: [{
                    Resource: "transactions",
                    Fields:  ["Account.Type", "Status"],
                }],
                Context: {
                    Resource: "transaction_lines"
                }
            }
        };
        console.log(pageConfiguration);
        return pageConfiguration;
    }
    private initOptions() : {key:ResourceType, value:ResourceType}[]
    {
        let options : {key:ResourceType, value:ResourceType}[] = [];
        for(let resource of ResourceTypes){
            options.push({key: resource, value: resource})
        }
        return options;
    }
    ngOnInit(): void {
        this.updateHostObject();
        // Raise default event for set-page-configuration (if pageConfiguration not exist on host object).
        if (!this.hostObject || !this.hostObject.pageConfiguration) {
            this.setPageConfig();
        }
    }

    private setPageConfig() {
        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: this.getDefaultPageConfiguration()
        });
    }

    ngOnChanges(e: any): void { 
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    onConsumerResourceChange(resource:ResourceType){
        this._configuration.consumerResource = resource;
        
        this.setPageConfig();
        this.updateHostObject();
    }
    private updateHostObject() {
        
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: this.configuration
        });
    }
    
}

export class ConsumeEditorConfig{
    consumerResource: ResourceType | undefined;
}
