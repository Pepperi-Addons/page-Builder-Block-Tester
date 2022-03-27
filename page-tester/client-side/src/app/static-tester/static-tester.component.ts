import { IBlockHostObject } from 'src/models/page-block.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddonService } from 'src/app/services/addon.service';
import { Page, PapiClient } from '@pepperi-addons/papi-sdk';

@Component({
    selector: 'static-tester',
    templateUrl: './static-tester.component.html',
    styleUrls: ['./static-tester.component.scss']
})

export class StaticTesterComponent implements OnInit {
    private _hostObject : IBlockHostObject;
    papiClient: PapiClient;

    @Input() 
    set hostObject(value: IBlockHostObject){
        this._hostObject = value;
        console.log(`Static Tester Block host object:\n${JSON.stringify(this.hostObject)}`);
        this.onHostObjectChange();
    }
    get hostObject() : IBlockHostObject{
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    textToScreen : string;
    constructor(private addonService: AddonService) {
        this.papiClient = addonService.papiClient;
    }

    ngOnInit(): void {
    }

    onTestBlockClick(){
        this.textToScreen = "TEST PASSED";
    }

    async onTestApiClick(){
        const pages : Page[] = await this.papiClient.pages.find();
        this.textToScreen = JSON.stringify(pages);
    }
    

    onHostObjectChange(){
        if(this.hostObject?.parameters){
            this.textToScreen = JSON.stringify(this.hostObject?.parameters);
        }
    }

}
