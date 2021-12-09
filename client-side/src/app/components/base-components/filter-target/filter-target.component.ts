import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { PageContext, PageFilter, ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';
import { OutputFileType } from 'typescript';
import { Resource } from '../../options.model';
import { FilterTarget } from './FilterTarget';

@Component({
  selector: 'addon-filter-target[target]',
  templateUrl: './filter-target.component.html',
  styleUrls: ['./filter-target.component.scss']
})
export class FilterTargetComponent implements OnInit {

  resource : ResourceType | undefined;
  fields: Array<string> = [];



  @Input() target : string;
  @Input() pageFilter : PageFilter;

  filterTarget : FilterTarget;

  @Output() setTargetFilter = new EventEmitter<PageFilter>();
  @Output() onTargetContextChange = new EventEmitter<PageContext>();
  
  options;
  selectId : string;
  textboxId: string;
  buttonText: string;

  constructor(filterTarget : FilterTarget,
              resource : Resource) {
    this.filterTarget = filterTarget;
    this.options = resource.options;
  }

  ngOnInit(): void {
    for (let resource of ResourceTypes) {
      this.options.push({ key: resource, value: resource });
    }

    this.initIds();

    if(this.pageFilter){
      this.initValues();
    }
  }
  
  private initIds() {
    this.selectId = `${this.target}-resourceType`;
    this.textboxId = `${this.target}-apiNames`;
    this.buttonText = this.target == "producer" ? 
                        `Add ${this.target} filter` : 
                        `Set ${this.target} filter`;
  }

  private initValues(){
    if(this.pageFilter?.Fields){
      this.fields = this.pageFilter?.Fields;
    }
    if(this.pageFilter?.Resource){
      this.resource = this.pageFilter?.Resource;
    }
  }

  onChange(key : string, value: ResourceType | string) {
    switch (key) {
      case "Fields":
        this.fields = value ? value.trim().split(',') : [];
        break;

      case "Resource":
        this.resource = value as ResourceType;
        break;

      default:
        throw new Error("Key not supported");
    }
  }
  
  onBtnClick(){
    let pageFilter : PageFilter;
    if(this.resource || this.fields?.length > 0){
      pageFilter= { Resource: this.resource, Fields: this.fields};
      this.setTargetFilter.emit(pageFilter);
    }
  }
}

