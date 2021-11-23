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
    
    @Input() hostObject: IHostObject;

    pageConsume: PageConsume;

    private getDefaultPageConsume() : PageConsume {
        const pageConsume : PageConsume = {
            Filter: undefined,
            Context: undefined
        };

        return pageConsume;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    
    constructor(private translate: TranslateService) { }

    
    ngOnInit(): void {

        this.pageConsume = this.hostObject?.pageConfiguration?.Consume ?
                                this.hostObject?.pageConfiguration?.Consume :
                                {
                                    Filter: undefined,
                                    Context: undefined
                                };

        // Raise default event for set-page-configuration (if pageConfiguration not exist on host object).
        if (!this.hostObject?.pageConfiguration?.Consume) {
            this.pageConsume = this.hostObject?.pageConfiguration?.Consume;
            this.setPageConfig();
        }
        else{
            this.pageConsume = this.getDefaultPageConsume();
        }
    }

    private setPageConfig() {
        console.log(`BEFORE set event: ${JSON.stringify(this.hostObject?.pageConfiguration?.Consume)}`);

        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: this.pageConsume
        });
        // console.log(this.pageConfiguration);
        console.log(`AFTER set event: ${JSON.stringify(this.hostObject?.pageConfiguration?.Consume)}`);

    }

    ngOnChanges(e: any): void { 
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    onConsumerChange( consumerFilter : PageFilter){
        this.pageConsume = {
                Filter: consumerFilter,
                Context: {
                            
                } 
            }

        this.setPageConfig();
    }
    
}
