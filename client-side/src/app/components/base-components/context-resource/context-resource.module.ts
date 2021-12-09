import { EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextResourceComponent } from './context-resource.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { Resource } from '../../options.model';



@NgModule({
  declarations: [
    ContextResourceComponent
  ],
  exports: [ContextResourceComponent],
  imports: [
    CommonModule,
    PepSelectModule
  ],
  providers: [
    Resource
  ]
})
export class ContextResourceModule { }
