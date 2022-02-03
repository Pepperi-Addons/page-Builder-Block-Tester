import { stringTestParam, filterTestParam } from './../test-data';
import { IBlockHostObject, IFilter } from './../../models/page-block.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'page-tester',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.scss']
})
export class PageTesterComponent implements OnInit {
    private _hostObject : IBlockHostObject;

    @Input() 
    set hostObject(value: IBlockHostObject){
        debugger;
        this._hostObject = value;
        this.onHostObjectChange();
    }
    get hostObject() : IBlockHostObject{
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    receivedParameters : string;
    testValuesIndex : number;
    stringTestValues = this.getStringTestValues();
    // filterTestValue : IFilter = {
    //     ApiName: 'x',
    //     Values: ['Test']
    // }
    temp = this.constructor.name;
    testValues = {
        [stringTestParam.Key]: this.getStringTestValues(),
        [filterTestParam.Key]: this.getFilterTestValues(),
    }
    constructor(
        ) {
    }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }
    getStringTestValues(){
        const testValue : Array<number> = [];
        for(let i=0; i<1; i++){
            testValue.push(i);
        }
        return testValue;
    }
    getFilterTestValues(){
        const testValue : Array<IFilter> = [];
        for(let i=0; i<1; i++){
            testValue.push({
                ApiName: 'x',
                FieldType: "String",
                Operation: "IsEqual",
                Values: [`Test${i}`]
            });
        }
        return testValue;
    }

    onHostObjectChange(){
        if(this.hostObject?.parameters){
            debugger;
            this.receivedParameters = JSON.stringify(this.hostObject.parameters);
            const stringValue = this.hostObject.parameters[stringTestParam.Key];
            this.validateReceivedParameter(stringTestParam.Key, 
                typeof stringValue !== typeof this.stringTestValues[this.testValuesIndex] ? parseInt(stringValue) : stringValue);
            // this.validateReceivedParameter(this.hostObject.parameters[stringTestParam.Key]);
            this.validateReceivedParameter(filterTestParam.Key, this.hostObject.parameters[filterTestParam.Key]);
        }
    }

    validateReceivedParameter(key: string, value: any){
        // value = typeof value !== typeof this.stringTestValues[this.testValuesIndex] ? parseInt(value) : value;
        if(value !== this.testValues[key][this.testValuesIndex]){
            // throw new Error(`Received parameter mismatch!\nReceived: ${value}\nExpected/Current: ${JSON.stringify(this.testValues[key][this.testValuesIndex])}`);
            console.log(`Received parameter mismatch!\nReceived: ${value}\nExpected/Current: ${JSON.stringify(this.testValues[key][this.testValuesIndex])}`);

        }
    }

    

    onClick(){
        for(const [index, value] of this.stringTestValues.entries()){
            // debugger;
            this.setParameter(filterTestParam.Key, this.testValues[filterTestParam.Key][index]);

            // this.setParameter(stringTestParam.Key, this.testValues[stringTestParam.Key][index]);
            this.testValuesIndex = index;
        }
    }

    setParameter(key: string, value: any){
        this.hostEvents.emit({
            action: 'set-parameter',
            key: key,
            value: value
        });
    }
}
