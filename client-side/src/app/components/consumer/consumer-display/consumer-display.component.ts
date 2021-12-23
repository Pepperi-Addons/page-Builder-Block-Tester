import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePair } from '@pepperi-addons/ngx-lib';
import { PageConsume } from '@pepperi-addons/papi-sdk';
import { IHostObject } from 'src/app/IHostObject';

@Component({
  selector: 'consumer-display[hostObject]',
  templateUrl: './consumer-display.component.html',
  styleUrls: ['./consumer-display.component.scss']
})
export class ConsumerDisplayComponent implements OnInit {

  private _hostObject: any;
  
  @Input()
  set hostObject(value: any) {
      this._hostObject = value;
      this.handleHostObjectChange();
  }
  get hostObject(): any {
      return this._hostObject;
  }
  
  private _pageConsume : PageConsume;
  set pageConsume(value : PageConsume){
    this._pageConsume = value;
    this.handlePageConsumeChange();
  }
  get pageConsume(){
    return this._pageConsume;
  }

  groupFields : Array<KeyValuePair<string>>;
  
  consumedFilter : string;
  handlePageConsumeChange(){
    this.groupFields = new Array<KeyValuePair<string>>(
      { Key: "Context", Value: this.pageConsume?.Context?.Resource},
      { Key: "Resource", Value: this.pageConsume?.Filter?.Resource},
      { Key: "Fields", Value: this.pageConsume?.Filter?.Fields.toString()}
    );
  }
  handleHostObjectChange(){
    this.pageConsume = (this.hostObject as IHostObject)?.pageConfiguration?.Consume;
    this.consumedFilter = this.hostObject?.filter ? JSON.stringify(this.hostObject?.filter) : null;
  }
  constructor() { }

  ngOnInit(): void {
  }
}
