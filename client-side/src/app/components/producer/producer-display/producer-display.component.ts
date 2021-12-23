import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { TranslateService } from '@ngx-translate/core';
import { PageFilter, PageProduce } from '@pepperi-addons/papi-sdk';
import { of } from 'rxjs';
// import { GenericListDataSource } from '../../base-components/generic-list/generic-list.component';
import { pageFiltersDataView } from '../../cards-grid-dataview.default';

@Component({
  selector: 'producer-display[pageProduce]',
  templateUrl: './producer-display.component.html',
  styleUrls: ['./producer-display.component.scss']
})
export class ProducerDisplayComponent implements OnInit {


  private _filters: Array<PageFilter>;
  @Input()
  set filters(value) {
    this._filters = value;
    this.filterChange();
  }
  get filters() {
    return this._filters;
  }


  private _pageProduce: PageProduce;
  @Input()
  set pageProduce(value: PageProduce) {
    this._pageProduce = value;
    this.filters = this._pageProduce?.Filters;
  }
  get pageProduce() {
    return this._pageProduce;
  }

  displayedColumns: string[] = ['Resource', 'Fields'];
  dataSource = new MatTableDataSource<PageFilter>([]);
  // listDataSource: GenericListDataSource = this.getListDataSource();
  listDataSource = pageFiltersDataView;


  // private getListDataSource(): GenericListDataSource {
  //   return {
  //     getDataView: pageFiltersDataView,
  //   };
  // }

  constructor(
    // private translate: TranslateService
    ) {

  }

  ngOnInit(): void {
  }

  filterChange() {
    of(this.filters).subscribe({
      next: (data: PageFilter[]) => {
        this.dataSource.data = data;
      }
    });
  }

}
