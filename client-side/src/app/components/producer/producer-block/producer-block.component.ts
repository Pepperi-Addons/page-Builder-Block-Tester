import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageProduce } from '@pepperi-addons/papi-sdk';
import { ISetFilter } from '../block-filter/set-filters-editor/set-filters-editor.component';
import { IHostObject } from 'src/app/IHostObject';
import { BlockFiltersService } from '../block-filter/block-filters.service';
import { IBlockFilter } from '../block-filter/blockfilter.model';
import { map, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
    selector: 'producer-block[hostObject]',
    templateUrl: './producer-block.component.html',
    styleUrls: ['./producer-block.component.css']
})
export class ProducerBlockComponent implements OnInit, OnDestroy {

    private _hostObject: IHostObject;

    @Input()
    set hostObject(value: IHostObject) {
        this._hostObject = value;
        this.handleHostObjectChange();
    }
    get hostObject(): IHostObject {
        return this._hostObject;
    }

    filters: Array<ISetFilter>;
    private _pageProduce : ReplaySubject<PageProduce> = new ReplaySubject<PageProduce>();
    public pageProduce$ = this._pageProduce.asObservable();

    pageProduce: PageProduce;
    blockKey: string;

    @Output() onFiltersRaised: EventEmitter<Array<ISetFilter>> = new EventEmitter<Array<ISetFilter>>();

    constructor(
        private filtersService: BlockFiltersService) { }

    

    private handleHostObjectChange() {
        this._pageProduce.next(this.hostObject?.pageConfiguration?.Produce);
        // if (this.hostObject?.pageConfiguration?.Produce) {
        //     this.pageProduce = this.hostObject.pageConfiguration.Produce;
        // }

        if(!this.blockKey){
            this.blockKey = this.hostObject?.configuration?.blockKey;
            this.filtersService.blockKey = this.blockKey;
        }
    }
    unsubscribe$: Subject<boolean> = new Subject();

    ngOnInit(): void {
        
        this.filtersService.jsonFilters$
            .pipe(map((blockFilters) => this.convertToSetFilters(blockFilters)), takeUntil(this.unsubscribe$))
            .subscribe((setFilters) => this.filters = setFilters)
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }

    private convertToSetFilters(blockFilters : IBlockFilter[]) : ISetFilter[]{
        let setFilters: Array<ISetFilter> = [];
                blockFilters.forEach((blockFilter) => {
                    setFilters.push(this.blockToSetFilter(blockFilter));
                });
                return setFilters;
    }
    private blockToSetFilter(blockFilter: IBlockFilter): ISetFilter {
        return {
            resource: blockFilter.resource,
            filter: {
                ApiName: blockFilter?.ApiName,
                FieldType: blockFilter?.FieldType,
                Operation: blockFilter?.Operation,
                Values: blockFilter?.Values
            }
        }
    }
    onBtnClick() {
        this.onFiltersRaised.emit(this.filters);
    }

}

