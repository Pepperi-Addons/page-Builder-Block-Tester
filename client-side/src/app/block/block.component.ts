import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISetFilter } from '../components/producer/block-filter/set-filters-editor/set-filters-editor.component';
import { IHostObject } from '../IHostObject';

@Component({
  selector: 'block-tester',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockTesterComponent implements OnInit {
  private _hostObject : IHostObject;
  @Input() 
  set hostObject(value: IHostObject){
    this._hostObject = value;
    this.consumerEnabled = this._hostObject?.configuration?.consumerEnabled;
    this.producerEnabled = this._hostObject?.configuration?.producerEnabled;
  }
  get hostObject(){
    return this._hostObject;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
  
  consumerEnabled : boolean = false;
  
  private _producerEnabled : boolean = false;
  set producerEnabled(value : boolean){
    
    if(this._producerEnabled != value){
      this._producerEnabled = value;
      if(!value){
        this.setJsonFilters([]);
      }
    }
  }
  get producerEnabled(){
    return this._producerEnabled;
  }
  private _setFilters : Array<ISetFilter>;

  constructor(
      private translate: TranslateService
      ) {
  }

  ngOnInit(): void {
      // When finish load raise block-loaded.
      this.hostEvents.emit({action: 'block-loaded'});
  }

  setJsonFilters(filtersArray : Array<ISetFilter>){
    this.hostEvents.emit({
            action: 'set-filters',
            filters: filtersArray
        });
  }
}
