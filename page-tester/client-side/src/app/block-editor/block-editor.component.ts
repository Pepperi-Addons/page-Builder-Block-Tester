import { stringTestParam, filterTestParam } from './../test-data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration } from '@pepperi-addons/papi-sdk';

@Component({
    selector: 'page-tester-editor',
    templateUrl: './block-editor.component.html',
    styleUrls: ['./block-editor.component.scss']
})


export class PageTesterEditorComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    

    constructor(
        // private translate: TranslateService
        ) { }

    ngOnInit(): void {
        // When finish load raise block-editor-loaded.
        // this.hostEvents.emit({action: 'block-editor-loaded'});
        this.setPageConfiguration();
    }

    ngOnChanges(e: any): void {
        
    }

    setPageConfiguration(){
        const pageConfig : PageConfiguration = {
            Parameters: [
                // stringTestParam,
                filterTestParam
            ]
        }

        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: pageConfig
        });
    }
}
