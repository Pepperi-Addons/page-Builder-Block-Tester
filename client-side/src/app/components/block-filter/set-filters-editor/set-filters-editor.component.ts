import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectsDataRow } from '@pepperi-addons/ngx-lib';
import { GridDataView, ResourceType } from '@pepperi-addons/papi-sdk';
import { Observable, of } from 'rxjs';
import { GenericListDataSource } from '../../base-components/generic-list/generic-list.component';
import { IBlockFilter, IFilter } from '../blockfilter.model';


export declare type BlockFilterKeys = keyof IBlockFilter;

export interface ISetFilter{
  resource?: ResourceType,
  filter?: IFilter,
}

@Component({
  selector: 'set-filters-editor',
  templateUrl: './set-filters-editor.component.html',
  styleUrls: ['./set-filters-editor.component.scss']
})
export class SetFiltersEditorComponent implements OnInit {

  visibleComponent: string = "list";

  blockFiltersArray: Array<IBlockFilter> = [];

  listDataSource: GenericListDataSource = this.getListDataSource();


  @Output() hostEvents = new EventEmitter<any>();
  @Output() blockFiltersChange = new EventEmitter<Array<ISetFilter>>();


  constructor() { }

  ngOnInit(): void {
  }

  getBlockFilters(): Observable<Array<IBlockFilter>> {
    return of(this.blockFiltersArray);
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
        if(dataRowCell?.ApiName && dataRowCell?.FormattedValue != ""){
          blockFilter[dataRowCell.ApiName] = dataRowCell?.FormattedValue;
        }
      });
      console.log(`set-filters-editor - After converting to IBlockFilter array: ${JSON.stringify(blockFilter)}`);
      blockFiltersArray.push(blockFilter);
    });
    return blockFiltersArray;
  }

  deleteBlockFilter(filtersArray: IBlockFilter[]) {
    for (const filter of filtersArray) {
      const index = this.getFilterIndex(this.blockFiltersArray, filter);
      if (index > -1) {
        if (this.blockFiltersArray.length == 1) {
          this.blockFiltersArray = [];
        }
        else {
          this.blockFiltersArray.splice(index, 1);
        }
      }
    }
    this.blockFiltersArray = this.blockFiltersArray.slice();
    this.onFiltersChange();
  };

  private getListDataSource(): GenericListDataSource {
    return {
      getDataView: () => {
        const gridView: GridDataView = {
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
        return of(gridView);
      }
    }
      ;
  }

  add() {
    this.visibleComponent = "add";
  }

  private onFiltersChange() {
    let setFilters : Array<ISetFilter> = [];
    this.blockFiltersArray.forEach((blockFilter) => {
      // let tempFilter : ISetFilter = { };
      // if(blockFilter?.resource){
      //   tempFilter.resource = blockFilter.resource;
      // }
      // if(blockFilter?.ApiName){
      //   tempFilter.filter.ApiName = tempFilter.filter ? blockFilter.ApiName : tempFilter;
      // }
      // if(blockFilter?.FieldType){
      //   tempFilter.filter.FieldType = blockFilter.FieldType;
      // }
      // if(blockFilter?.Operation){
      //   tempFilter.filter.Operation = blockFilter.Operation;
      // }
      // if(blockFilter?.Values){
      //   tempFilter.filter.Values = blockFilter.Values;
      // }
      // setFilters.push({
      //   resource: blockFilter.resource,
      //   filter: {
      //     FieldType: blockFilter.FieldType,
      //     ApiName: blockFilter.ApiName,
      //     Operation: blockFilter.Operation,
      //     Values: blockFilter.Values,
      //   }
      // });
      // setFilters.push(tempFilter);
      setFilters.push(this.blockToSetFilter(blockFilter));
    });
    this.blockFiltersChange.emit(setFilters);

  }

  blockToSetFilter(blockFilter : IBlockFilter) : ISetFilter
  {
    return {
      resource: blockFilter.resource,
      filter:{
        ApiName: blockFilter?.ApiName,
        FieldType: blockFilter?.FieldType,
        Operation: blockFilter?.Operation,
        Values: blockFilter?.Values
      }
    }
  }

  onAddingFilter(blockFilter: IBlockFilter) {

    this.blockFiltersArray.push(blockFilter);
    this.blockFiltersArray = this.blockFiltersArray.slice();
    this.onFiltersChange();
    this.visibleComponent = "list";
  }

  private getFilterIndex(filtersArray: IBlockFilter[], filter: IBlockFilter) {
    return filtersArray.findIndex(x => JSON.stringify(x) == JSON.stringify(filter), 0);
  }
}

