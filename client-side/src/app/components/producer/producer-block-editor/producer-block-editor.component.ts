import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration, PageContext, PageFilter, PageProduce, ResourceType } from '@pepperi-addons/papi-sdk';
import { IHostObject } from 'src/app/IHostObject';

@Component({
    selector: 'producer-block-editor',
    templateUrl: './producer-block-editor.component.html',
    styleUrls: ['./producer-block-editor.component.css']
})
export class ProducerBlockEditorComponent implements OnInit {
    private _context : ResourceType | undefined;
    private _filters : Array<PageFilter> = [];

    @Input() hostObject: any;
    
    
    pageConfiguration : PageConfiguration;

    handleHostObjectChange(){
        this.pageConfiguration = this.hostObject.pageConfiguration;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) { }

    // private getDefaultPageConfiguration() {
    //     const pageConfiguration : PageConfiguration = {
    //         Consume: {
    //             Filter: {
    //                 Resource: "transaction_lines",
    //                 Fields:  ["UnitsQuantity", "Item.TSABrand", "Transaction.Status"],//, "Transaction.Account.Type"
    //             },
    //             Context: {
    //                 Resource: "transaction_lines"
    //             }
    //         },
    //         Produce: {
    //             Filters: [{
    //                 Resource: "transactions",
    //                 Fields:  ["UnitsQuantity", "Item.TSABrand", "Account.Type", "Status"],
    //             },
    //             // {
    //             //     Resource: "transaction_lines",
    //             //     Fields:  ["UnitsQuantity", "Item.TSABrand", "Transaction.Account.Type", "Transaction.Status"],
    //             // },
    //             {
    //                 Resource: "accounts",
    //                 Fields:  ["Name", "Type", "Status"],
    //             }],
    //             Context: {
    //                 Resource: "transaction_lines"
    //             }
    //         }
    //     };

    //     return pageConfiguration;
    // }

    ngOnInit(): void {

        this.pageConfiguration = this.hostObject.pageConfiguration;
        if(!this.hostObject?.pageConfiguration?.Produce){
            this.pageConfiguration = {
                Produce:{
                    Context: {Resource: this._context},
                    Filters: this._filters,
                }
            };
        }
        // Raise default event for set-page-configuration (if pageConfiguration not exist on host object).
        if (this.hostObject?.PageConfiguration) {
            this.setPageConfiguration();
        }
    }


    private setPageConfiguration() {
        this.pageConfiguration = {
            Produce:{
                Context: {Resource: this._context},
                Filters: this._filters,
            }
        }
        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: this.pageConfiguration
        });
        console.log(this.pageConfiguration);
    }

    addProducerFilter(producerFilter : PageFilter){
        if(producerFilter && (producerFilter.Resource || producerFilter.Fields.length>0)){
            this._filters.push(producerFilter);
        }
        this.setPageConfiguration();
    }
    setContext(contextResource: PageContext){
        this._context = contextResource.Resource;
        this.setPageConfiguration();
    }
}
