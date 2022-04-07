import { IBlockHostObject } from 'src/models/page-block.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { AddonService } from 'src/app/services/addon.service';
import { Page, PapiClient } from '@pepperi-addons/papi-sdk';
import { ConfigParserService } from '../services/config-parser.service';

@Component({
    selector: 'static-tester',
    templateUrl: './static-tester.component.html',
    styleUrls: ['./static-tester.component.scss']
})

export class StaticTesterComponent implements OnInit {
    private _hostObject : IBlockHostObject;
    papiClient: PapiClient;
    private _blockId: string;

    public get blockId(): string {
        return this._blockId;
    }

    public set blockId(value: string) {
        if(this._blockId){
        console.log(`WARNING: blockId can only be assigned once. Current value: ${this._blockId}`);
        }
        else{
        this._blockId = value ? value : undefined;
        }
    }

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
    constructor(private addonService: AddonService, private configParser: ConfigParserService, private elementRef: ElementRef, private renderer: Renderer2) {
        this.papiClient = addonService.papiClient;
    }

    ngOnInit(): void {
        this.blockId = this.configParser.getBlockId(this.hostObject);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'block-id', this.blockId);
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
