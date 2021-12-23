import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ObjectsDataRow } from '@pepperi-addons/ngx-lib';
import { GridDataView, ResourceType } from '@pepperi-addons/papi-sdk';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockFiltersService } from '../block-filters.service';
import { IBlockFilter, IFilter } from '../blockfilter.model';


export declare type BlockFilterKeys = keyof IBlockFilter;

export interface ISetFilter {
  resource?: ResourceType,
  filter?: IFilter,
}

@Component({
  selector: 'set-filters-editor[blockKey]',
  templateUrl: './set-filters-editor.component.html',
  styleUrls: ['./set-filters-editor.component.scss']
})
export class SetFiltersEditorComponent implements OnInit, OnDestroy {

  visibleComponent: string = "list";

  blockFilters: Array<IBlockFilter>;
  unsubscribe$: Subject<boolean> = new Subject();

  listDataView: GridDataView;

  @Input() blockKey: string;
  @Input() title: string;

  @Output() hostEvents = new EventEmitter<any>();
  @Output() blockFiltersChange = new EventEmitter<Array<ISetFilter>>();


  constructor(private filtersService: BlockFiltersService) {

  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.listDataView = this.filtersDataView;
    this.filtersService.blockKey = this.blockKey;
    this.filtersService.jsonFilters$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IBlockFilter[]) => this.blockFilters = data);

  }


  getActions = async (dataRows: ObjectsDataRow[]) => {
    let actions = [];
    console.log(`Received objects in ${'getActions'} from set-filters-editor: ${JSON.stringify(dataRows)}`);
    if (dataRows === undefined || (dataRows.length > 0 && dataRows[0] === undefined)) {
      throw new Error("ObjectsDataRow for actions is 'undefined'");
    }
    if (dataRows.length > 0) {
      const blockFiltersArray: IBlockFilter[] = this.convertToBlockFilters(dataRows);
      actions.unshift(
        {
          title: "Delete",
          handler: async (objs: ObjectsDataRow[]) => {
            this.deleteBlockFilter(blockFiltersArray);
          }
        }
      );
    }

    return actions;
  }

  private convertToBlockFilters(dataRows: ObjectsDataRow[]) {
    const blockFiltersArray: IBlockFilter[] = [];
    dataRows.forEach((row) => {
      let blockFilter: IBlockFilter = {};
      row.Fields.forEach((dataRowCell) => {
        if (dataRowCell?.ApiName && dataRowCell?.FormattedValue != "") {
          blockFilter[dataRowCell.ApiName] = dataRowCell?.FormattedValue;
        }
      });
      console.log(`set-filters-editor - After converting to IBlockFilter array: ${JSON.stringify(blockFilter)}`);
      blockFiltersArray.push(blockFilter);
    });
    return blockFiltersArray;
  }

  deleteBlockFilter(filtersArray: IBlockFilter[]) {
    let blockFiltersArray = this.blockFilters;
    for (const filter of filtersArray) {
      const index = this.getFilterIndex(blockFiltersArray, filter);
      if (index > -1) {
        if (blockFiltersArray.length == 1) {
          blockFiltersArray = [];
        }
        else {
          blockFiltersArray.splice(index, 1);
        }
      }
    }
    this.filtersService.updateFiltersData(blockFiltersArray);

  };


  filtersDataView: GridDataView = {
    Type: 'Grid',
    Fields: [
      {
        FieldID: 'resource',
        Type: 'TextBox',
        Title: "Resource",
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
        FieldID: 'FieldType',
        Type: 'TextBox',
        Title: "FieldType",
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
        FieldID: 'ApiName',
        Type: 'TextBox',
        Title: "ApiName",
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
        FieldID: 'Operation',
        Type: 'TextBox',
        Title: "Operation",
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
        FieldID: 'Values',
        Type: 'TextBox',
        Title: "Values",
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
      },
      {
        Width: 0
      },
      {
        Width: 0
      },
      {
        Width: 0
      }
    ]
  }
  // return gridView;
  // }
  // }

  // }

  add() {
    this.visibleComponent = "add";
  }

  blockToSetFilter(blockFilter: IBlockFilter): ISetFilter {
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

  onAddingFilter(blockFilter: IBlockFilter) {
    let blockFiltersArray = this.blockFilters;
    blockFiltersArray.push(blockFilter);
    this.filtersService.updateFiltersData(blockFiltersArray);
    this.visibleComponent = "list";
  }

  private getFilterIndex(filtersArray: IBlockFilter[], filter: IBlockFilter) {
    return filtersArray.findIndex(x => JSON.stringify(x) == JSON.stringify(filter), 0);
  }
}

