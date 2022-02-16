import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigParserService, SetParameterAction } from 'src/app/services/config-parser.service';
import { IBlockHostObject } from 'src/models/page-block.model';

@Component({
  selector: 'init-tester',
  templateUrl: './init-tester.component.html',
  styleUrls: ['./init-tester.component.scss']
})
export class InitTesterComponent implements OnInit {

  hostObjectString: string;
  consumeString: string;
  parameterValues: SetParameterAction[];
  loadTime: number;

  private _hostObject: IBlockHostObject;
  
  @Input()
  set hostObject(value: IBlockHostObject) {
    this._hostObject = value;
    console.log(`Init Tester Block host object:\n${this.hostObjectString}`);
    this.onHostObjectChange();
  }
  get hostObject(): IBlockHostObject {
    return this._hostObject;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  

  constructor(private configParser: ConfigParserService) { }

  ngOnInit(): void {
    this.loadTime = performance.now();
    this.parameterValues = this.configParser.parseParameterValues(this.hostObject);
    this.parameterValues.forEach((param) => this.setParameter(param));
  }

  onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.consumeString = JSON.stringify(this.hostObject?.parameters);
  }

  setParameter(param: SetParameterAction){
    this.hostEvents.emit(param);
  }
}
