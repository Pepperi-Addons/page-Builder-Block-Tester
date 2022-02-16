import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBlockHostObject } from 'src/models/page-block.model';

@Component({
  selector: 'init-tester-editor',
  templateUrl: './init-tester-editor.component.html',
  styleUrls: ['./init-tester-editor.component.scss']
})
export class InitTesterEditorComponent implements OnInit {

  @Input() hostObject: IBlockHostObject;

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  setPageConfiguration(event: any) {
    this.hostEvents.emit(event);
  }

}
