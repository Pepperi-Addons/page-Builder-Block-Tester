import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageFilter, PageProduce, ResourceType } from '@pepperi-addons/papi-sdk';
import { BehaviorSubject, Observable } from 'rxjs';
import { pageFiltersDataView } from '../../cards-grid-dataview.default';

@Component({
  selector: 'producer-display[pageProduceObs]',
  templateUrl: './producer-display.component.html',
  styleUrls: ['./producer-display.component.scss']
})
export class ProducerDisplayComponent implements OnInit {

  @Input() pageProduceObs : Observable<PageProduce>;

  pageFilters : Array<PageFilter>;
  produceContext : ResourceType;

  displayedColumns: string[] = ['Resource', 'Fields'];
  
  listDataSource = pageFiltersDataView;


  constructor() {  

  }

  ngOnInit(): void {
    this.pageProduceObs.subscribe((data) => {
      this.pageFilters = data?.Filters ? data.Filters : [];
      this.produceContext = data?.Context?.Resource;
    });
  }

}
