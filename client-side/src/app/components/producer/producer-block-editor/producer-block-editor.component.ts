import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CardDataView, GridDataView, LineDataView, PageConfiguration, PageContext, PageFilter, PageProduce, ResourceType } from '@pepperi-addons/papi-sdk';
import { IHostObject } from 'src/app/IHostObject';
import { GenericListComponent, GenericListDataSource } from '../../generic-list/generic-list.component';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { CardsGridDataView } from 'papi-sdk-web';

export type VisibleComponent = "list" | "add";

@Component({
    selector: 'producer-block-editor',
    templateUrl: './producer-block-editor.component.html',
    styleUrls: ['./producer-block-editor.component.css']
})
export class ProducerBlockEditorComponent implements OnInit {
    @ViewChild(GenericListComponent) 
    filtersList: GenericListComponent;
    @Input() hostObject: any;
    visibleComponent : VisibleComponent = "list";
    
    pageProduce : PageProduce;

    handleHostObjectChange(){
        this.pageProduce = this.hostObject.pageConfiguration;
    }

    @Output() producerChange: EventEmitter<PageProduce> = new EventEmitter<PageProduce>();
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService,
        public dialog: PepDialogService) { }
    private getDefaultPageProduce() : PageProduce {
        const pageProduce : PageProduce = {
            Filters: [],
            Context: undefined
        };

        return pageProduce;
    }
    listDataSource: GenericListDataSource;

    ngOnInit(): void {
        this.pageProduce = this.hostObject?.pageConfiguration?.Produce ?
                                this.hostObject?.pageConfiguration?.Produce :
                                this.getDefaultPageProduce();
        this.listDataSource = this.getListDataSource();
    }

    

    private getListDataSource(): GenericListDataSource {
        return {
            getList: async (state) => {
                return this.pageProduce?.Filters;
            },

            getDataView: async () => {
                // const gridView: GridDataView = {
                //     Context: {
                //         Name: '',
                //         Profile: { InternalID: 0 },
                //         ScreenSize: 'Phablet'
                //     },
                //     Type: 'Grid',
                //     Title: '',
                //     Fields: [
                //         {
                //             FieldID: 'Resource',
                //             Type: 'ComboBox',
                //             Title: this.translate.instant("Resource"),
                //             Mandatory: false,
                //             ReadOnly: true
                //         },
                //         {
                //             FieldID: 'Fields',
                //             Type: 'TextBox',
                //             Title: this.translate.instant("Fields"),
                //             Mandatory: false,
                //             ReadOnly: true
                //         }
                //     ],
                //     Columns: [
                //         {
                //             Width: 25
                //         },
                //         {
                //             Width: 75
                //         }
                //     ],
                //     FrozenColumnsCount: 0,
                //     MinimumColumnWidth: 0
                // };
                // return gridView;
                const cardView: CardsGridDataView  = {
                    // Context: {
                    //     Name: '',
                    //     Profile: { InternalID: 0 },
                    //     ScreenSize: 'Landscape'
                    // },
                    Type: 'CardsGrid',
                    // Title: 'Producer Filter',
                    Fields: [
                        {
                            FieldID: 'Resource',
                            Type: 'TextBox',
                            Title: this.translate.instant("Resource"),
                            Mandatory: false,
                            ReadOnly: true,
                            Style: {
                                Alignment: {
                                    Horizontal: "Left",
                                    Vertical: "Center",
                                },
                            }
                        },
                        {
                            FieldID: 'Fields',
                            Type: 'TextBox',
                            Title: this.translate.instant("Fields"),
                            Mandatory: false,
                            ReadOnly: true,
                            Style: {
                                Alignment: {
                                    Horizontal: "Left",
                                    Vertical: "Center",
                                },
                            }
                        }
                    ],
                    Columns: [
                                {
                                    Width: 0
                                },
                                {
                                    Width: 0
                                }
                            ]
                }
                return cardView;
            },

            getActions: async (objs: PageFilter[]) => {
                let actions = [];

                if (objs.length > 0) {
                    actions.unshift(
                        {
                            title: this.translate.instant("Delete"),
                            handler: async (objs) => {
                                this.deletePageFilter(objs);
                            }
                        }
                    );
                }

                return actions;
            }
        };
    }

    add() {
        this.visibleComponent = "add";
        // this.router.navigate(['create'], {
        //     relativeTo: this.route,
        //     queryParamsHandling: 'merge'
        // });
    }

    deletePageFilter(pageFilter : PageFilter[]) {
        for(let filter of pageFilter){
            const index = this.pageProduce.Filters.indexOf(filter, 0);
            if (index > -1) {
                if(this.pageProduce.Filters.length == 1){
                    this.pageProduce.Filters = [];
                }
                else{
                    this.pageProduce.Filters.splice(index, 1);
                }
            }
        }
        this.onProduceChange();
        this.filtersList?.reload();
    };
    
    onContextChange(pageContext : PageContext){
        this.pageProduce.Context = pageContext;
        this.onProduceChange();
    }
    private onProduceChange() {
            this.producerChange.emit(this.pageProduce);
            this.hostEvents.emit({
                action: "set-page-configuration",
                pageConfiguration: {
                    Produce: this.pageProduce,
                }
            });
        }
        
    addProducerFilter(producerFilter : PageFilter){
        // debugger;
        
        if(producerFilter && (producerFilter.Resource || producerFilter.Fields.length>0)){
            this.pageProduce.Filters.push(producerFilter);
        }
        this.visibleComponent = "list";
        this.onProduceChange();
    }
}
