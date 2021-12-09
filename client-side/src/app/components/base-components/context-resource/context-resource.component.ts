import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageContext, ResourceType } from '@pepperi-addons/papi-sdk';
import { Resource } from '../../options.model';

@Component({
  selector: 'context-resource',
  templateUrl: './context-resource.component.html',
  styleUrls: ['./context-resource.component.scss']
})
export class ContextResourceComponent implements OnInit {

  @Input() contextResource: ResourceType;
  
  @Output() contextChange: EventEmitter<PageContext> = new EventEmitter<PageContext>();

  value: ResourceType;
  options : any;

  constructor(private resource : Resource) {
    this.options = resource.options;
  }

  ngOnInit(): void {
    if (this.contextResource)
      this.value = this.contextResource;
  }

  valueChange(value: ResourceType) {
    this.value = value;
    const pageContext : PageContext = {
      Resource: this.value,
    }
    this.contextChange.emit(pageContext);
  }
}
