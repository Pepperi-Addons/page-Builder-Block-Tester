import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTargetComponent } from './filter-target.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { FilterTarget } from './FilterTarget';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { SelectOptions } from '../../options.model';



@NgModule({
  declarations: [
    FilterTargetComponent
  ],
  
  
  exports: [FilterTargetComponent],
  providers: [
    FilterTarget,
    SelectOptions
],
  imports: [
    CommonModule,
    PepSelectModule,
    PepTextboxModule,
    PepButtonModule,
  ]
})
export class FilterTargetModule { }
