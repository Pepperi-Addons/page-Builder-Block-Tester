import { stringTestParam, filterTestParam } from './../test-data';
import { IBlockHostObject, IFilter } from 'src/models/page-block.model';
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
        this._hostObject = value;
        console.log(`BLOCK host object:\n${JSON.stringify(this.hostObject)}`);
        this.onHostObjectChange();
    }
    get hostObject() : IBlockHostObject{
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    receivedParameters : string;
    testValuesIndex : number;
    stringTestValues = this.getStringTestValues();
    indexArray : number[] = [];
    temp = this.constructor.name;
    testValues : Map<string,any[]> = new Map<string,any[]>();
    paramIndices: Map<string,number> = new Map<string,number>();
    constructor() {
    }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.testValues.set(stringTestParam.Key, this.getStringTestValues());
        this.testValues.set(filterTestParam.Key, this.getFilterTestValues());
        for(const paramKey of this.testValues.keys()){
            this.paramIndices.set(paramKey,this.testValues.get(paramKey).length);
        }
        
        for(let index=0; index<Math.max(...this.paramIndices.values()); index++){
            this.indexArray.push(index);
        }
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }
    getStringTestValues(){
        const testStrings : Array<number> = [];
        for(let i=0; i<10; i++){
            testStrings.push(i);
        }
        return testStrings;
    }
    getFilterTestValues(){
        const testFilters : Array<IFilter[]> = [];
        for(let i=0; i<10; i++){
            testFilters.push([{
                resource: filterTestParam.Resource,
                filter:{
                    ApiName: 'x',
                    FieldType: "String",
                    Operation: "IsEqual",
                    Values: [`Test${i}`]
                }
            }]);
        }
        return testFilters;
    }

    onHostObjectChange(){
        if(this.hostObject?.parameters){
            this.receivedParameters = JSON.stringify(this.hostObject?.parameters);
            // debugger;
            for(const paramKey in this.hostObject.parameters){
                if (this.testValues.has(paramKey)) {
                    this.validateReceivedParameter(paramKey, this.hostObject.parameters[paramKey])
                }
            }
        }
    }

    validateReceivedParameter(key: string, value: any){

        const testIndex = Math.min(this.testValuesIndex,this.paramIndices.get(key)-1);
        if(value !== this.testValues.get(key)[testIndex]){
            console.error(`Received parameter mismatch!\nReceived: ${JSON.stringify(value)}\nExpected (testIndex: ${testIndex}): ${JSON.stringify(this.testValues.get(key)[testIndex])}`);
        }
    }

    async onClick(){
        // this.testValuesIndex=0;
        // this.indexArray.forEach( async (index) => {
        //     this.paramIndices.forEach( async (value,key) => {
        //         if(index < this.paramIndices.get(key)){
        //             this.setParameter(key, this.testValues.get(key)[index]);
        //         }
        //     });
        //     this.testValuesIndex = index;
        // });
        for(this.testValuesIndex=0; this.testValuesIndex<Math.max(...this.paramIndices.values()); this.testValuesIndex++){
            // debugger;
            this.paramIndices.forEach( async (value,key) => {
                if(this.testValuesIndex < this.paramIndices.get(key)){
                    this.setParameter(key, this.testValues.get(key)[this.testValuesIndex]);
                    
                }
            });
            await this.sleepAsync(1000);
        }
    }
    async sleepAsync(ms: number) {
        // console.debug(`%cAsync Sleep: ${ms} milliseconds`, ConsoleColors.Information);
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // msSleep(ms: number) {
    //     Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    // }
    // sleep(ms: number) {
    //     this.msSleep(ms);
    //     return;
    // }

    async setParameter(key: string, value: any){
        console.log({
            action: 'set-parameter',
            key: key,
            value: value
        });
        this.hostEvents.emit({
            action: 'set-parameter',
            key: key,
            value: value
        });
    }
}
