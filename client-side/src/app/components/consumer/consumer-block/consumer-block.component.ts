import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'consumer-block',
    templateUrl: './consumer-block.component.html',
    styleUrls: ['./consumer-block.component.scss']
})
export class ConsumerBlockComponent implements OnInit {

    @Input() hostObject: any;   

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() { }

    ngOnInit(): void {
        this.hostEvents.emit({action: 'block-loaded'});
    }
}
