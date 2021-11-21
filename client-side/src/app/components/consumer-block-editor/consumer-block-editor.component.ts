import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration, PageConsume, PageFilter, ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';
import { IHostObject } from 'src/app/IHostObject';

@Component({
    selector: 'consumer-block-editor',
    templateUrl: './consumer-block-editor.component.html',
    styleUrls: ['./consumer-block-editor.component.scss']
})
export class ConsumerBlockEditorComponent implements OnInit {
    
    private _hostObject: any;
    @Input()
    set hostObject(value: any) {
        debugger;
        this._hostObject = value;
        this.handleHostObjectChange();
    }
    get hostObject(): any {
        return this._hostObject;
    }

    
    consumerContext = '';
    consumerResource = '';
    consumerFields;

    pageConfiguration: PageConfiguration = this.getDefaultPageConfiguration();

    private getDefaultPageConfiguration() {
        const pageConfiguration : PageConfiguration = {
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

        return pageConfiguration;
    }
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    
    constructor(private translate: TranslateService) { }

    handleHostObjectChange(){
        this.pageConfiguration = this.hostObject?.pageConfiguration;

        if (this.pageConfiguration) {
            this.consumerResource = this.pageConfiguration.Consume?.Filter?.Resource;
            this.consumerFields = this.pageConfiguration.Consume?.Filter?.Fields;
            this.consumerContext = this.pageConfiguration.Consume?.Context?.Resource;
        }
    }
    ngOnInit(): void {
        console.log("first \n" + JSON.stringify(this.hostObject));
        this.handleHostObjectChange();
        console.log("second \n" + JSON.stringify(this.hostObject));        // Raise default event for set-page-configuration (if pageConfiguration not exist on host object).
        if (!this.hostObject || !this.hostObject.PageConfiguration) {
            this.setPageConfig();
        }
        const temp = JSON.stringify(this.hostObject);
        console.log("third \n" + JSON.stringify(this.hostObject));
    }

    private setPageConfig() {
        console.log(`BEFORE set event: ${JSON.stringify(this.hostObject?.PageConfiguration?.Consume)}`);

        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: this.pageConfiguration
        });
        // console.log(this.pageConfiguration);
        console.log(`AFTER set event: ${JSON.stringify(this.hostObject?.PageConfiguration?.Consume)}`);

    }

    ngOnChanges(e: any): void { 
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    onConsumerChange(consumerFilter:PageFilter){
        console.log(`Before assignment: ${JSON.stringify(this.pageConfiguration)}`);
        // this._pageConfiguration.Consume.Filter = consumerFilter;
        this.pageConfiguration.Consume = 
            {
                Filter: consumerFilter,
                Context: {
                            
                } 
            }
        console.log(`After assignment: ${JSON.stringify(this.pageConfiguration)}`);
        
        
        this.setPageConfig();
    }
    
}
