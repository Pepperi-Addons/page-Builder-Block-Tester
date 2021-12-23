import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'consumer-block[hostObject]',
    templateUrl: './consumer-block.component.html',
    styleUrls: ['./consumer-block.component.scss']
})
export class ConsumerBlockComponent implements OnInit {

    @Input() hostObject: any;   
    
    constructor() { }

    ngOnInit(): void {
    }
}
