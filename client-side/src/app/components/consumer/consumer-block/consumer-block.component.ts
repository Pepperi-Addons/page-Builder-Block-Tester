import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'consumer-block',
    templateUrl: './consumer-block.component.html',
    styleUrls: ['./consumer-block.component.scss']
})
export class ConsumerBlockComponent implements OnInit {
    @ViewChild('filmStrip') filmStrip: any;

    private _hostObject: any;
    @Input()
    set hostObject(value: any) {
        this._hostObject = value;
        // this.handleHostObjectChange();
    }
    get hostObject(): any {
        return this._hostObject;
    }
    

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    options: {key:string, value:string}[] = [];
    images = 'https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/left-side-background.jpg;https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/logo.svg';
    inputTitle = '';
    currIndex = 0;
    
    constructor() { }

    // private handleHostObjectChange() {

    //     if (this.hostObject?.filter) {
    //         // alert(`Filter change in SubAddon2 with value ${JSON.stringify(this.hostObject?.filter)}`);

    //         this.inputTitle = JSON.stringify(this.hostObject?.filter);
    //     }
    // }

    ngOnInit(): void {
        this.options.push({key:'OPEN_DIALOG', value: 'Text 1' });
        this.options.push({key:'OPEN_DIALOG', value: 'Text 2' });
        this.images +=  ';' +this.hostObject?.configuration?.imageURL;
        this.hostEvents.emit({action: 'block-loaded'});
    }
}
