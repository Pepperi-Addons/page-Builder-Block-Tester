import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
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

  private _blockId: string;

  public get blockId(): string {
    return this._blockId;
  }

  public set blockId(value: string) {
    if(this._blockId){
      console.log(`WARNING: blockId can only be assigned once. Current value: ${this._blockId}`);
    }
    else{
      this._blockId = value ? value : undefined;
    }
  }
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

  

  constructor(private configParser: ConfigParserService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadTime = performance.now();
    this.parameterValues = this.configParser.parseParameterValues(this.hostObject);
    this.parameterValues.forEach((param) => this.setParameter(param));
    this.blockId = this.configParser.getBlockId(this.hostObject);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'block-id', this.blockId);

    this.parameterValues = this.configParser.parseParameterValues(this.hostObject);
  }

  onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.consumeString = JSON.stringify(this.hostObject?.parameters);
  }

  setParameter(param: SetParameterAction){
    this.hostEvents.emit(param);
  }
}
