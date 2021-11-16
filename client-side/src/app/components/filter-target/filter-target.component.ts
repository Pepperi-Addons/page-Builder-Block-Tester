import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';

@Component({
  selector: 'addon-filter-target',
  templateUrl: './filter-target.component.html',
  styleUrls: ['./filter-target.component.scss']
})
export class FilterTargetComponent implements OnInit {

  @Input() 
  resourceType: ResourceType | undefined;
  placeholder : string = "Enter APINames separated by commas.";
  private _fields: string[] = [];
  // @Input()
  set fields(value: string) {
    this._fields = value.trim().split(',');
  };
  get fields() {
    return this._fields.join(',');
  }
  // private _pageConfiguration: PageConfiguration;
  //   get configuration(): PageConfiguration {
  //     return this._pageConfiguration;
  //   }
  filterTarget : FilterTarget = new FilterTarget();
  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterTargetChange = new EventEmitter<any>();

  options: Array<{ key: ResourceType, value: ResourceType }> = [];

  constructor() { }

  ngOnInit(): void {
    for (let resource of ResourceTypes) {
      this.options.push({ key: resource, value: resource });
    }
  }
  
  onChange(key, value: ResourceType | string) {
    // debugger;
    this.filterTarget[key] = value;
    this.filterTargetChange.emit(this.filterTarget);
    // if(key == "resource"){
    //   this.resourceType = value as ResourceType;
    //   this.filterTargetChange.emit(this.resourceType);
    // }
    // else{
    //   this.fields = value;
    //   this.filterTargetChange.emit(this._fields);
    // }
  }
  // onResourceChange(resource: ResourceType) {
    
  //   this.filterTargetChange.emit(this.resourceType);
  // }

  // onFieldsChange(fieldsString: string) {
  //   this.fields = fieldsString;
  //   this.hostEvents.emit(this.fields);
  // }
  
}
@Injectable()
export class FilterTarget{
  private _resourceType?: ResourceType;
  set resourceType(value){
    this._resourceType = value as ResourceType;
  }
  get resourceType(){
    return this._resourceType;
  }
  private _apiNames: Array<string>;

  set apiNames(value : unknown){
    this._apiNames = value ? (value as string).trim().split(',') : [];

  }
  get apiNames(){
    return this._apiNames;
  }
}
