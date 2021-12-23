import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PepGuid } from '@pepperi-addons/ngx-lib';
import { PageConfiguration, PageConsume, PageProduce } from '@pepperi-addons/papi-sdk';
import { IHostObject } from '../IHostObject';

@Component({
  selector: 'block-tester-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss']
})
export class BlockTesterEditorComponent implements OnInit {

  @Input() hostObject: IHostObject;

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  private _blockKey: string;

  set blockKey(value: string) {
    if (!this._blockKey && value) {
      this._blockKey = value;
    }
  }
  get blockKey() {
    return this._blockKey;
  }

  consumerEnabled: boolean;
  
  producerEnabled: boolean;
  private _pageConfiguration : PageConfiguration;

  constructor() { }

  ngOnInit(): void {
    this.consumerEnabled = this.hostObject?.configuration?.consumerEnabled
      ? this.hostObject?.configuration?.consumerEnabled
      : (this.hostObject?.pageConfiguration?.Consume ? true : false);

    this.producerEnabled = this.hostObject?.configuration?.producerEnabled
      ? this.hostObject?.configuration?.producerEnabled
      : (this.hostObject?.pageConfiguration?.Produce ? true : false);

    this._pageConfiguration = {
      Consume: this.hostObject?.pageConfiguration?.Consume,
      Produce: this.hostObject?.pageConfiguration?.Produce,
    }

    this.initBlockKey();
    this.setConfiguration();
  }

  onCheckboxChange(name: string, value: boolean) {
    switch (name) {
      case "consumer":
        this.consumerEnabled = value;
        break;
      case "producer":
        this.producerEnabled = value;
        break;
      default:
        throw new Error(`'${name}' is not a supported name`);
    }
    this.setConfiguration();
  }

  private initBlockKey() {
    this.blockKey = this.hostObject?.configuration?.blockKey ? this.hostObject?.configuration?.blockKey : PepGuid.newGuid();
  }

  private setConfiguration() {
    const hostObject: IHostObject = {
      configuration: {
        blockKey: this.blockKey,
        producerEnabled: this.producerEnabled,
        consumerEnabled: this.consumerEnabled
      }
    };
    this.hostEvents.emit({
      action: "set-configuration",
      configuration: hostObject.configuration
    });
  }
  private setPageConfiguration(){
    this.hostEvents.emit({
      action: "set-page-configuration",
      pageConfiguration: this._pageConfiguration,
    });
  }

  onProducerChange(pageProduce: PageProduce) {
    this._pageConfiguration.Produce = pageProduce;
    this.setPageConfiguration();
  }

  onConsumerChange(pageConsume: PageConsume){
    this._pageConfiguration.Consume = pageConsume;
    this.setPageConfiguration();
  }
  


}
