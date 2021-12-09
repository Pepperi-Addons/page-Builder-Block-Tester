import { Component, Input, OnInit } from '@angular/core';
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
  
  pageConsume : PageConsume;

  consumedFilter : string;

  handleHostObjectChange(){
    this.pageConsume = (this.hostObject as IHostObject)?.pageConfiguration?.Consume;
    this.consumedFilter = JSON.stringify(this.hostObject?.filter);
  }
  constructor() { }

  ngOnInit(): void {
  }
}
