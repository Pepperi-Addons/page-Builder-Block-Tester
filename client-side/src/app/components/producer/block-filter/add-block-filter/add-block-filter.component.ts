import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResourceType, ResourceTypes } from '@pepperi-addons/papi-sdk';
import { SelectOptions } from '../../../options.model';
import { IBlockFilter } from '../blockfilter.model';


@Component({
  selector: 'add-block-filter',
  templateUrl: './add-block-filter.component.html',
  styleUrls: ['./add-block-filter.component.scss']
})
export class AddBlockFilterComponent implements OnInit {

  resource : ResourceType;
  fieldType : string;
  apiName: string;
  operation : string;
  values : Array<string> = [];

  blockFilter : IBlockFilter = {};

  @Output() addBlockFilter = new EventEmitter<IBlockFilter>();
  
  options : Array<{ key: ResourceType, value: ResourceType }>;
 
  buttonText: string = "Add block filter";

  constructor(selectOptions : SelectOptions) {
    this.options = selectOptions.resourceType;
  }

  ngOnInit(): void {
  }


  onChange(key : string, value) {
    let formattedValue : any;
    switch (key) {
      

      case "resource":
        formattedValue = value as ResourceType;
        this.resource = value as ResourceType;
        break;

      case "FieldType":
        formattedValue = value;
        this.fieldType = value;
        break;

      case "ApiName":
        formattedValue = value;
        this.apiName = value;
        break;

      case "Operation": 
        formattedValue = value;
        this.operation = value;
        break;

      case "Values":
        formattedValue = value ? value.trim().split(',') : [];
        this.values = value ? value.trim().split(',') : [];
        break;
      default:
        throw new Error("Key not supported");
    }
    
    this.blockFilter[key] = formattedValue;
    
    
  }
  
  onBtnClick(){
    this.addBlockFilter.emit(this.blockFilter);
    console.log(JSON.stringify(this.blockFilter));
    this.blockFilter = {};
  }

}
