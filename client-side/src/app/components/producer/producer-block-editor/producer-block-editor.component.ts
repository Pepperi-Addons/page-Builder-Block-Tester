import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsGridDataView, PageContext, PageFilter, PageProduce } from '@pepperi-addons/papi-sdk';
import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { ObjectsDataRow } from '@pepperi-addons/ngx-lib';
import { pageFiltersDataView } from '../../cards-grid-dataview.default';
import { IHostObject } from 'src/app/IHostObject';

export type VisibleComponent = "list" | "add";

@Component({
    selector: 'producer-block-editor[hostObject]',
    templateUrl: './producer-block-editor.component.html',
    styleUrls: ['./producer-block-editor.component.scss']
})
export class ProducerBlockEditorComponent implements OnInit {

    @Input() hostObject: IHostObject;

    visibleComponent: VisibleComponent = "list";

    pageProduce: PageProduce;

    @Output() producerChange: EventEmitter<PageProduce> = new EventEmitter<PageProduce>();

    constructor(
        public dialog: PepDialogService,
        ) { }
    private getDefaultPageProduce(): PageProduce {
        const pageProduce: PageProduce = {
            Filters: [],
            Context: undefined
        };

        return pageProduce;
    }
    listDataView: CardsGridDataView;

    ngOnInit(): void {
        this.pageProduce = this.hostObject?.pageConfiguration?.Produce ?
            this.hostObject?.pageConfiguration?.Produce :
            this.getDefaultPageProduce();
        
        this.listDataView = pageFiltersDataView;
    }

    getActions = async (objs: ObjectsDataRow[]) => {
        let actions = [];
        console.log(`Received objects in ${this.getActions.name} from producer-editor: ${JSON.stringify(objs)}`);
        if (objs === undefined || (objs.length > 0 && objs[0] === undefined)) {
            debugger;
            throw new Error("PageFilter objects for actions is 'undefined'");
        }
        if (objs.length > 0) {
            const pageFilters: PageFilter[] = this.dataRowsToPageFilters(objs);
            actions.unshift(
                {
                    title: "Delete",
                    handler: async () => {

                        console.log(`From producer-editor: ${pageFilters}`);
                        this.deletePageFilter(pageFilters);
                    }
                }
            );
        }

        return actions;
    }

    private dataRowsToPageFilters(objs: ObjectsDataRow[]) {
        const pageFilters: PageFilter[] = [];
        objs.forEach((row) => {
            const resource = row.Fields.find(x => x.ApiName == "Resource").FormattedValue;
            const fields = row.Fields.find(x => x.ApiName == "Fields").FormattedValue;
            console.log(`From producer-editor: ${resource}, ${fields}`);
            pageFilters.push(
                {
                    Resource: resource,
                    Fields: fields
                });
        });
        return pageFilters;
    }

    add() {
        this.visibleComponent = "add";
    }

    deletePageFilter(pageFilter: PageFilter[]) {
        for (let filter of pageFilter) {
            const index = this.getFilterIndex(this.pageProduce.Filters, filter);
            if (index > -1) {
                if (this.pageProduce.Filters.length == 1) {
                    this.pageProduce.Filters = [];
                }
                else {
                    this.pageProduce.Filters.splice(index, 1);
                }
            }
        }
        this.pageProduce.Filters = this.pageProduce.Filters.slice();
        this.onProduceChange();
    }

    onContextChange(pageContext: PageContext) {
        this.pageProduce.Context = pageContext;
        this.onProduceChange();
    }

    private onProduceChange() {
        this.producerChange.emit(this.pageProduce);
    }

    addProducerFilter(producerFilter: PageFilter) {

        if (producerFilter && (producerFilter.Resource || producerFilter.Fields.length > 0)) {
            if (this.getFilterIndex(this.pageProduce.Filters, producerFilter) > -1) {
                this.filterExistsAlert(producerFilter);
            }
            else {
                this.pageProduce.Filters.push(producerFilter);
                this.pageProduce.Filters = this.pageProduce.Filters.slice();
                this.onProduceChange();
            }
        }
        this.visibleComponent = "list";

    }

    private filterExistsAlert(producerFilter: PageFilter) {
        const content = `The filter ${JSON.stringify(producerFilter)} already exists`;
        const title = 'Add filter failed!';
        const dataMsg = new PepDialogData({ title, actionsType: "close", content });
        this.dialog.openDefaultDialog(dataMsg);
    }

    private getFilterIndex(filtersArray: PageFilter[], filter: PageFilter) {
        return filtersArray.findIndex(x => x?.Resource == filter?.Resource && JSON.stringify(x?.Fields) == JSON.stringify(filter?.Fields), 0);
    }
}
