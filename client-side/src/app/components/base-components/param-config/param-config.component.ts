import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageConfigurationParameter, PageConfigurationParameterFilter, PageConfigurationParameterString } from '@pepperi-addons/papi-sdk';
import { SelectOptions } from '../../options.model';

@Component({
  selector: 'param-config',
  templateUrl: './base-param-config.component.html',
  styleUrls: ['./base-param-config.component.css']
})
export class ParamConfigComponent implements OnInit {

  typeOptions: any

  paramKey: string | undefined;
  type: string | undefined;
  produce: boolean = false;
  consume: boolean = false;
  
  @Output() savedParam = new EventEmitter<PageConfigurationParameter>();

  constructor(selectOptions: SelectOptions) {
    this.typeOptions = selectOptions.resourceType;
  }

  ngOnInit(): void {
  }

  typeChange(type : string){
    this.type = type;
  }
  onParamSaved($event){
    switch(this.type){
      case "Filter": 
        this.emitConfigParamFilter($event);
        break;
      case "String":
        this.emitConfigParamString();
        break;
      default:
        throw new Error(`PageConfigurationParameter of Type '${this.type}' not supported`);
    }
  }

  private emitConfigParamString() {
    const stringParam: PageConfigurationParameterString = {
      Key: this.paramKey,
      Type: 'String',

      Mandatory: false,
      Consume: this.consume,
      Produce: this.produce
    };
    this.savedParam.emit(stringParam);
  }

  private emitConfigParamFilter($event: any) {
    const filterParam: PageConfigurationParameterFilter = {
      Key: this.paramKey,
      Type: 'Filter',
      Resource: $event.Resource,
      Fields: $event.Fields,

      Mandatory: false,
      Consume: this.consume,
      Produce: this.produce
    };
    this.savedParam.emit(filterParam);
  }
}
