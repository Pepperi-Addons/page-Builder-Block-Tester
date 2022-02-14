import { IBlockHostObject, IFilter } from '../../../models/page-block.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'consumer-tester',
    templateUrl: './consumer-tester.component.html',
    styleUrls: ['./consumer-tester.component.scss']
})
export class ConsumerBlockComponent implements OnInit {
    private _hostObject : IBlockHostObject;

    @Input() 
    set hostObject(value: IBlockHostObject){
        this._hostObject = value;
        console.log(`CONSUMER BLOCK host object:\n${JSON.stringify(this.hostObject)}`);
        this.onHostObjectChange();
    }
    get hostObject() : IBlockHostObject{
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    receivedParameters : string;
    constructor(
        ) {
    }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }
    

    onHostObjectChange(){
        if(this.hostObject?.parameters){
            this.receivedParameters = JSON.stringify(this.hostObject?.parameters);
        }
    }

}
