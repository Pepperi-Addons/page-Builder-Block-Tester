import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardsGridDataView, PageFilter, PageProduce } from '@pepperi-addons/papi-sdk';
import { Observable, of } from 'rxjs';
import { GenericListComponent, GenericListDataSource } from '../../generic-list/generic-list.component';

@Component({
  selector: 'producer-display[pageProduce]',
  templateUrl: './producer-display.component.html',
  styleUrls: ['./producer-display.component.scss']
})
export class ProducerDisplayComponent implements OnInit {
  
  
  private _filters : Array<PageFilter>;
  @Input()
  set filters(value){
    this._filters = value;
    this.filterChange();
  }
  get filters(){
    return this._filters;
  }


  private _pageProduce : PageProduce;
  @Input() 
  set pageProduce (value: PageProduce){
    this._pageProduce = value;
    this.filters = this._pageProduce?.Filters;
  }
  get pageProduce(){
    return this._pageProduce;
  }

  displayedColumns : string[] = ['Resource', 'Fields'];
  dataSource  = new MatTableDataSource<PageFilter>([]);

 
  constructor() { 

  }

  ngOnInit(): void {
  }

  filterChange(){
    of(this.filters).subscribe({next: (data : PageFilter[]) => {
      this.dataSource.data = data;
    }});
  }

}
