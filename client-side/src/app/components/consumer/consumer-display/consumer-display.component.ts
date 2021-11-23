import { Component, Input, OnInit } from '@angular/core';

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
  
  consumedFilter : string;

  handleHostObjectChange(){
    this.consumedFilter = JSON.stringify(this.hostObject?.filter);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
