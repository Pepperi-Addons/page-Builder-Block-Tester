import { Attribute, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { IBlockHostObject } from 'src/models/page-block.model';
import { ConfigParserService, SetParameterAction } from '../services/config-parser.service';

@Component({
  selector: 'dynamic-tester',
  templateUrl: './dynamic-tester.component.html',
  styleUrls: ['./dynamic-tester.component.scss']
})
export class DynamicTesterComponent implements OnInit {
  
  hostObjectString: string;
  consumeString: string;
  parameterValues: SetParameterAction[];
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
    console.log(`Dynamic Tester Block host object:\n${this.hostObjectString}`);
    this.onHostObjectChange();
  }
  get hostObject(): IBlockHostObject {
    return this._hostObject;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor(private configParser: ConfigParserService, private elementRef: ElementRef, private renderer: Renderer2) {

   }

  ngOnInit(): void {
    this.setBlockIdAttr();

    this.parameterValues = this.configParser.parseParameterValues(this.hostObject);
    
  }

  private setBlockIdAttr() {
    this.blockId = this.configParser.getBlockId(this.hostObject);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'block-id', this.blockId);
  }

  onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.consumeString = JSON.stringify(this.hostObject?.parameters);
  }
  
  setParameter(param: SetParameterAction){
    console.log(`Producing parameter: ${JSON.stringify(param)}`);
    this.hostEvents.emit(param);
  }

}
