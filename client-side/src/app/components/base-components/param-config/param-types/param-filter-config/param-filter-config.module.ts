import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamFilterConfigComponent } from './param-filter-config.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { SelectOptions } from '../../../../options.model';



@NgModule({
  declarations: [
    ParamFilterConfigComponent
  ],
  providers: [
    SelectOptions
  ],
  imports: [
    CommonModule,
    PepTextboxModule,
    PepSelectModule
  ],
  exports: [ParamFilterConfigComponent],
})
export class ParamFilterConfigModule { }
