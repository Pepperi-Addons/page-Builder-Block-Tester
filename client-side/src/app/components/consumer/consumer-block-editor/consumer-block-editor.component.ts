// import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConsume, PageContext, PageFilter } from '@pepperi-addons/papi-sdk';
import { IHostObject } from 'src/app/IHostObject';

@Component({
    selector: 'consumer-block-editor[hostObject]',
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

    @Output() consumerChange: EventEmitter<PageConsume> = new EventEmitter<PageConsume>();
    
    constructor() { }

    
    ngOnInit(): void {
        this.pageConsume = this.hostObject?.pageConfiguration?.Consume ?
                                this.hostObject?.pageConfiguration?.Consume :
                                this.getDefaultPageConsume();
    }

    private onConsumeChange() {
        this.consumerChange.emit(this.pageConsume);
        
    }

    ngOnChanges(e: any): void { 
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    onFilterChange( consumerFilter : PageFilter){
        this.pageConsume.Filter = consumerFilter;
        this.onConsumeChange();
    }

    onContextChange(pageContext : PageContext){
        this.pageConsume.Context = pageContext;
        this.onConsumeChange();
    }
    
}
