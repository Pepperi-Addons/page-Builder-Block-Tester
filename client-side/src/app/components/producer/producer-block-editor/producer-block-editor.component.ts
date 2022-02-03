import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsGridDataView, PageConfigurationParameter, PageFilter } from '@pepperi-addons/papi-sdk';
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

    pageProduce: PageConfigurationParameter[];

    @Output() producerChange: EventEmitter<PageConfigurationParameter[]> = new EventEmitter<PageConfigurationParameter[]>();

    constructor(
        public dialog: PepDialogService,
        ) { }
    private getDefaultPageProduce(): PageConfigurationParameter[] {
        const pageProduce: PageConfigurationParameter[] = [];

        return pageProduce;
    }
    listDataView: CardsGridDataView;

    ngOnInit(): void {
        const produceConfigParams = this.hostObject?.pageConfiguration?.Parameters.filter(pageParamConfig => pageParamConfig.Produce);
        this.pageProduce = produceConfigParams?.length > 0 ?
        produceConfigParams :
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

    deletePageFilter(pageConfigParams: PageConfigurationParameter[]) {
        for (let filter of pageConfigParams) {
            const index = this.getFilterIndex(this.pageProduce, filter);
            if (index > -1) {
                if (this.pageProduce.length == 1) {
                    this.pageProduce = [];
                }
                else {
                    this.pageProduce.splice(index, 1);
                }
            }
        }
        this.pageProduce = this.pageProduce.slice();
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

    private getFilterIndex(configParamsArray: PageConfigurationParameter[], filter: PageConfigurationParameter) {
        return configParamsArray.findIndex(configParam => JSON.stringify(configParam) == JSON.stringify(filter), 0);
    }
}
