import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { PageContext, PageFilter, ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';
import { OutputFileType } from 'typescript';
import { FilterTarget } from './FilterTarget';

@Component({
  selector: 'addon-filter-target[target]',
  templateUrl: './filter-target.component.html',
  styleUrls: ['./filter-target.component.scss']
})
export class FilterTargetComponent implements OnInit {

  _context : ResourceType | undefined;
  _resource : ResourceType | undefined;
  _fields: Array<string> | undefined

  @Input() target : string;

  @Output() setTargetFilter = new EventEmitter<PageFilter>();
  @Output() setTargetContext = new EventEmitter<PageContext>();
  
  options: Array<{ key: ResourceType, value: ResourceType }> = [];
  contextId : string;
  selectId : string;
  textboxId: string;
  buttonText: string;

  constructor() { 
  }

  ngOnInit(): void {
    for (let resource of ResourceTypes) {
      this.options.push({ key: resource, value: resource });
    }
    this.contextId = `${this.target}-context`;
    this.selectId = `${this.target}-resourceType`;
    this.textboxId = `${this.target}-apiNames`;
    this.buttonText = this.target == "producer" ? `Add ${this.target} filter` : `Set ${this.target} filter`;
  }
  
  onChange(key : string, value: ResourceType | string) {
    switch (key) {
      case "Fields":
        this._fields = value ? value.trim().split(',') : [];
        break;
      case "Resource":
        this._resource = value as ResourceType;
      default:
        throw new Error("Key not supported");
    }
    
  }
  onContextChange(value : ResourceType)
  {
    this._context = value;
    const pageContext : PageContext = { Resource: this._context};
    this.setTargetContext.emit(pageContext);
  }
  onBtnClick(){
    let pageFilter : PageFilter;
    if(this._resource || this._fields?.length > 0){
      pageFilter= { Resource: this._resource, Fields: this._fields};
      this.setTargetFilter.emit(pageFilter);
    }
  }
  
}

