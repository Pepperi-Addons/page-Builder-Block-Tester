import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'consumer-block',
    templateUrl: './consumer-block.component.html',
    styleUrls: ['./consumer-block.component.scss']
})
export class ConsumerBlockComponent implements OnInit {

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
    
    constructor() { }

    // private handleHostObjectChange() {

    //     if (this.hostObject?.filter) {
    //         // alert(`Filter change in SubAddon2 with value ${JSON.stringify(this.hostObject?.filter)}`);

    //         this.inputTitle = JSON.stringify(this.hostObject?.filter);
    //     }
    // }

    ngOnInit(): void {
        this.hostEvents.emit({action: 'block-loaded'});
    }
}
