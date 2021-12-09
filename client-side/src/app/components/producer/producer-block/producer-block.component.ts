import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageProduce} from '@pepperi-addons/papi-sdk';
import { ISetFilter } from '../../block-filter/set-filters-editor/set-filters-editor.component';

@Component({
    selector: 'producer-block',
    templateUrl: './producer-block.component.html',
    styleUrls: ['./producer-block.component.css']
})
export class ProducerBlockComponent implements OnInit {
    
    private _hostObject: any;

    @Input()
    set hostObject(value: any) {
        this._hostObject = value;
        this.handleHostObjectChange();
    }
    get hostObject(): any {
        return this._hostObject;
    }
    filters : Array<ISetFilter>;

    pageProduce : PageProduce;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) { }

    private handleHostObjectChange() {
        if(this.hostObject?.pageConfiguration?.Produce){
            this.pageProduce = this.hostObject.pageConfiguration.Produce;
        }
    }

    ngOnInit(): void {
        this.hostEvents.emit({action: 'block-loaded'});
    }
    onFiltersChange(blockFilters : Array<ISetFilter>){
        this.filters = blockFilters;
    }
    onBtnClick(event) {
        this.hostEvents.emit({
            action: 'set-filters',
            filters: this.filters});
        console.log(this.filters);
    }
    
}

