import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceType } from '@pepperi-addons/papi-sdk';
import { SelectOptions } from '../../../../options.model';

@Component({
  selector: 'param-filter-config',
  templateUrl: './param-filter-config.component.html',
  styleUrls: ['./param-filter-config.component.css']
})
export class ParamFilterConfigComponent implements OnInit {



  resourceOptions;

  @Input() resource : ResourceType | undefined;
  @Input() fields: Array<string> | undefined;

  @Output() saveParam = new EventEmitter<{Resource: ResourceType, Fields: Array<string>}>();

  constructor(selectOptions: SelectOptions) {
    this.resourceOptions = selectOptions.resourceType;
  }

  ngOnInit(): void {
  }

  onResourceChange(resourceType : ResourceType){
    this.resource = resourceType;
  }

  onFieldsChange(fields : string){
    this.fields = fields ? fields.split(',') : [];
  }

  onSaveClick(){
    this.saveParam.emit({Resource: this.resource, Fields: this.fields});
  }

}
