import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfiguration, PageConfigurationParameter } from '@pepperi-addons/papi-sdk';
import { IBlockHostObject } from 'src/models/page-block.model';
import { ConfigParserService } from '../services/config-parser.service';

@Component({
  selector: 'dynamic-tester-editor',
  templateUrl: './dynamic-tester-editor.component.html',
  styleUrls: ['./dynamic-tester-editor.component.scss']
})
export class DynamicTesterEditorComponent implements OnInit, AfterViewInit {

  private _hostObject: IBlockHostObject;

  @Input()
  set hostObject(value: IBlockHostObject) {
    this._hostObject = value;
    this.onHostObjectChange();
  }
  get hostObject(): IBlockHostObject {
    return this._hostObject;
  }

  private onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.parametersString = [];
    this.hostObject?.pageConfiguration?.Parameters?.forEach(param => this.parametersString.push(JSON.stringify(param)));
    console.log(`Dynamic Tester Editor host object:\n${this.hostObjectString}`);
  }

  parametersString: string[];
  hostObjectString: string;
  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();


  constructor(private configParser: ConfigParserService) { }
  
  ngAfterViewInit(): void {
    this.setPageConfiguration();
  }

  ngOnInit(): void {
    // this.setPageConfiguration();
  }

  private setPageConfiguration() {
    const pageConfiguration :PageConfiguration = this.configParser.parsePageConfiguration(this.hostObject);
    if (this.hostObject?.pageConfiguration !== pageConfiguration) {
      console.log(`Setting page configuration to: ${JSON.stringify(pageConfiguration)}`);
      this.hostEvents.emit({
        action: 'set-page-configuration',
        pageConfiguration: pageConfiguration
      });
    }
  }

  


}
