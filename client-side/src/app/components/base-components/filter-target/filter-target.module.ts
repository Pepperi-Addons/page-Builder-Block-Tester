import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTargetComponent } from './filter-target.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { FilterTarget } from './FilterTarget';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { Resource } from '../../options.model';



@NgModule({
  declarations: [
    FilterTargetComponent
  ],
  
  
  exports: [FilterTargetComponent],
  providers: [
    FilterTarget,
    Resource
],
  imports: [
    CommonModule,
    PepSelectModule,
    PepTextboxModule,
    PepButtonModule,
  ]
})
export class FilterTargetModule { }
