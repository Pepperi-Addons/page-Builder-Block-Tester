import { stringTestParam, filterTestParam } from 'src/app/manual-test-blocks/test-data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration } from '@pepperi-addons/papi-sdk';
import { IBlockHostObject } from '../../../models/page-block.model';

@Component({
    selector: 'consumer-tester-editor',
    templateUrl: './consumer-tester-editor.component.html',
    styleUrls: ['./consumer-tester-editor.component.scss']
})


export class ConsumerBlockEditorComponent implements OnInit {
    private _hostObject : IBlockHostObject;

    @Input() 
    set hostObject(value: IBlockHostObject){
        this._hostObject = value;
        console.log(`EDITOR host object:\n${JSON.stringify(this.hostObject)}`);
    }
    get hostObject() : IBlockHostObject{
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    

    constructor(
        // private translate: TranslateService
        ) { }

    ngOnInit(): void {
        // When finish load raise block-editor-loaded.
        // this.hostEvents.emit({action: 'block-editor-loaded'});
        this.setConfiguration();
        this.setPageConfiguration();

    }

    ngOnChanges(e: any): void {
        
    }

    setPageConfiguration(){
        const pageConfig : PageConfiguration = {
            Parameters: [
                stringTestParam,
                filterTestParam
            ]
        }

        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: pageConfig
        });
    }

    setConfiguration(){
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: {
                test: 'BlockEditor'
            }
        })
    }
}
