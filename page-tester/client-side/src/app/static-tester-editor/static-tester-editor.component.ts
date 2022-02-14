import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBlockHostObject } from '../../models/page-block.model';

@Component({
    selector: 'static-tester-editor',
    templateUrl: './static-tester-editor.component.html'
})


export class StaticTesterEditorComponent implements OnInit {
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
        ) { }

    ngOnInit(): void {
    }

    ngOnChanges(e: any): void {
        
    }
}
