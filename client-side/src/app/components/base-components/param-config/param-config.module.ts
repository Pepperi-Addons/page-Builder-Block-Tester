import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamConfigComponent } from './param-config.component';
import { SelectOptions } from '../../options.model';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { ParamStringConfigModule } from './param-types/param-string-config/param-string-config.module';
import { ParamFilterConfigModule } from './param-types/param-filter-config/param-filter-config.module';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';

@NgModule({
  declarations: [
    ParamConfigComponent
  ],

  providers: [
    SelectOptions
  ],
  
  exports: [ParamConfigComponent],
  imports: [
    CommonModule,
    PepSelectModule,
    ParamStringConfigModule,
    ParamFilterConfigModule,
    PepCheckboxModule,
    PepTextboxModule
  ]
})
export class BaseParamConfigModule { }
