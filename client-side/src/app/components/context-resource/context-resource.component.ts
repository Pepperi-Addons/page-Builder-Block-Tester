import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageContext, ResourceType } from '@pepperi-addons/papi-sdk';

@Component({
  selector: 'addon-context-resource',
  templateUrl: './context-resource.component.html',
  styleUrls: ['./context-resource.component.scss']
})
export class ContextResourceComponent implements OnInit {

  @Input() currentValue: ResourceType;
  @Output() contextChange: EventEmitter<PageContext>;

  context: ResourceType;

  constructor(eventEmitter: EventEmitter<PageContext>) {
    this.contextChange = eventEmitter;
  }

  ngOnInit(): void {
    if (this.currentValue)
      this.context = this.currentValue;
  }

  valueChange(value: ResourceType) {
    this.context = value;
    const pageContext: PageContext = { Resource: this.context };
    this.contextChange.emit(pageContext);
  }

}
