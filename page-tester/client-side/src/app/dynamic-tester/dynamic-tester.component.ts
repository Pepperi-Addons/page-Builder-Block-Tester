import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBlockHostObject } from 'src/models/page-block.model';
import { ConfigParserService, SetParameterAction } from '../services/config-parser.service';

@Component({
  selector: 'dynamic-tester',
  templateUrl: './dynamic-tester.component.html',
  styleUrls: ['./dynamic-tester.component.scss']
})
export class DynamicTesterComponent implements OnInit {

  private _hostObject: IBlockHostObject;
  hostObjectString: string;
  consumeString: string;
  @Input()
  set hostObject(value: IBlockHostObject) {
    this._hostObject = value;
    console.log(`Dynamic Tester Block host object:\n${this.hostObjectString}`);
    this.onHostObjectChange();
  }
  get hostObject(): IBlockHostObject {
    return this._hostObject;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  setParameters: SetParameterAction[];

  constructor(private configParser: ConfigParserService) { }

  ngOnInit(): void {
  }

  onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.consumeString = JSON.stringify(this.hostObject?.parameters);
    const parameters = this.configParser.parseSetParameters(this.hostObject);
    if(this.setParameters !== parameters){
      this.setParameters = parameters;
    }
  }
  
  setParameter(param: SetParameterAction){
    this.hostEvents.emit(param);
  }

}
