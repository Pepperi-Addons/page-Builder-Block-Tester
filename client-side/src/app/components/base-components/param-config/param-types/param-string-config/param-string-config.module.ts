import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamStringConfigComponent } from './param-string-config.component';



@NgModule({
  declarations: [
    ParamStringConfigComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ParamStringConfigModule]
})
export class ParamStringConfigModule { }
